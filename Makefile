init: docker-down-clear frontend-clear docker-pull docker-build docker-up frontend-init frontend-ready
init-ci: docker-create-traefik-network init
up: docker-up
down: docker-down
restart: down up
check: frontend-lint frontend-test
update-deps: yarn-upgrade restart

docker-create-traefik-network:
	docker network create traefik-public

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build --pull

frontend-clear:
	docker run --rm -v ${PWD}:/app -w /app alpine sh -c 'rm -rf .ready build'

frontend-init: yarn-install

yarn-install:
	docker-compose run --rm bb-node-cli yarn install

yarn-upgrade:
	docker-compose run --rm bb-node-cli yarn upgrade

yarn-add:
	docker-compose run --rm bb-node-cli yarn add $(p) $(f)

yarn-remove:
	docker-compose run --rm bb-node-cli yarn remove $(p)

frontend-ready:
	docker run --rm -v ${PWD}:/app -w /app alpine touch .ready

frontend-lint:
	docker-compose run --rm bb-node-cli yarn eslint
	docker-compose run --rm bb-node-cli yarn stylelint

frontend-eslint-fix:
	docker-compose run --rm bb-node-cli yarn eslint-fix

frontend-pretty:
	docker-compose run --rm bb-node-cli yarn prettier

frontend-test:
	docker-compose run --rm bb-node-cli yarn test --watchAll=false

frontend-test-watch:
	docker-compose run --rm bb-node-cli yarn test

build:
	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
    --target builder \
    --cache-from ${REGISTRY}/bb:cache-builder \
    --tag ${REGISTRY}/bb:cache-builder \
	--file docker/production/nginx/Dockerfile .

	DOCKER_BUILDKIT=1 docker --log-level=debug build --pull --build-arg BUILDKIT_INLINE_CACHE=1 \
    --cache-from ${REGISTRY}/bb:cache-builder \
    --cache-from ${REGISTRY}/bb:cache \
    --tag ${REGISTRY}/bb:cache \
    --tag ${REGISTRY}/bb:${IMAGE_TAG} \
	--file docker/production/nginx/Dockerfile .

try-build:
	REGISTRY=localhost IMAGE_TAG=0 make build

push-dev-cache:
	docker-compose push

push-build-cache:
	docker push ${REGISTRY}/bb:cache-builder
	docker push ${REGISTRY}/bb:cache

push:
	docker push ${REGISTRY}/bb:${IMAGE_TAG}

deploy:
	ssh -v deploy@${HOST} -p ${PORT} 'docker network create traefik-public || true'
	ssh -v deploy@${HOST} -p ${PORT} 'rm -rf site_${BUILD_NUMBER}'
	ssh -v deploy@${HOST} -p ${PORT} 'mkdir site_${BUILD_NUMBER}'
	scp -v -P ${PORT} docker-compose-production.yml deploy@${HOST}:site_${BUILD_NUMBER}/docker-compose.yml
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && echo "COMPOSE_PROJECT_NAME=biobank" >> .env'
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && echo "REGISTRY=${REGISTRY}" >> .env'
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && echo "IMAGE_TAG=${IMAGE_TAG}" >> .env'
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && echo "REACT_APP_FRONTEND_URL=${REACT_APP_FRONTEND_URL}" >> .env'
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker-compose pull'
	ssh -v deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker-compose up --build --remove-orphans -d'
	ssh -v deploy@${HOST} -p ${PORT} 'rm -f site'
	ssh -v deploy@${HOST} -p ${PORT} 'ln -sr site_${BUILD_NUMBER} site'

rollback:
	ssh deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker-compose pull'
	ssh deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker-compose up --build --remove-orphans -d'
	ssh deploy@${HOST} -p ${PORT} 'rm -f site'
	ssh deploy@${HOST} -p ${PORT} 'ln -sr site_${BUILD_NUMBER} site'

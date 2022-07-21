import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    usePagination,
    VisibilityIcon,
    PublicIcon,
    EditIcon,
    DeleteIcon,
    Box,
    useSorting,
    useCheckboxes,
    AlertError,
    parseErrors,
    req,
    urls,
    encodeGetParams,
} from 'Common';
import {
    sampleTypes,
    updateSamples,
    updateSample,
    createSample,
    deleteSamples,
    deleteAllSamples,
    updateSpecies,
    selectSamplesList,
    selectSamplesAmount,
    selectSpecies,
} from 'Bank';
import { SamplesTable } from '../SamplesTable';
import { Pagination } from '../Pagination';
import { NoContent } from '../NoContent';
import { UpperPanel } from '../UpperPanel';
import { DetailsModal } from '../DetailsModal';
import { DeleteOneModal } from '../DeleteOneModal';
import { MapModal } from '../MapModal';
import { DeleteAllModal } from '../DeleteAllModal';
import { DeleteSelectedModal } from '../DeleteSelectedModal';
import { EditModal } from '../EditModal';

const columns = ['code', 'nameLat', 'date', 'place'];

const a = {
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    LOADING: 'LOADING',
    DATA: 'DATA',
    SERVER_GENERAL_ERROR: 'SERVER_GENERAL_ERROR',
    SERVER_VALIDATION_ERRORS: 'SERVER_VALIDATION_ERRORS',
};
const initModal = {
    name: '',
    open: false,
    loading: true,
    data: {},
    serverGeneralError: '',
    serverValidationErrors: {},
};
const initModals = {
    edit: { ...initModal, name: 'edit' },
    map: { ...initModal, name: 'map' },
    details: { ...initModal, name: 'details' },
    deleteOne: { ...initModal, name: 'deleteOne' },
    deleteAll: { ...initModal, name: 'deleteAll' },
    deleteSelected: { ...initModal, name: 'deleteSelected' },
};

function reducer(state, action) {
    const newModals = { ...state };

    switch (action.type) {
        case a.OPEN:
            newModals[action.name].open = true;
            break;
        case a.CLOSE:
            newModals[action.name].open = false;
            newModals[action.name].loading = false;
            newModals[action.name].serverGeneralError = '';
            newModals[action.name].serverValidationErrors = {};
            break;
        case a.LOADING:
            newModals[action.name].loading = action.loading;
            break;
        case a.DATA:
            newModals[action.name].data = { ...newModals[action.name].data, ...action.data };
            break;
        case a.SERVER_GENERAL_ERROR:
            newModals[action.name].serverGeneralError = action.error;
            break;
        case a.SERVER_VALIDATION_ERRORS:
            newModals[action.name].serverValidationErrors = action.errors;
            break;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }

    return newModals;
}

function List({ type }) {
    const [modals, dispatchModals] = useReducer(reducer, initModals);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [searchText, setSearchText] = useState('');

    const storedSamples = useSelector(selectSamplesList(type));
    const samplesAmount = useSelector(selectSamplesAmount(type));
    const species = useSelector(selectSpecies);
    const dispatch = useDispatch();

    const { sortedData: samples, order, orderBy, handleSort } = useSorting(storedSamples || [], 'code', 'asc', onSort);

    const { selected, handleSelectOne, handleSelectAll, areSelectedAll, skipSelected } = useCheckboxes(
        samples.map((s) => s.id)
    );

    const { t } = useTranslation();
    const paginationData = usePagination({
        data: samples,
        amount: samplesAmount,
        defaultRowsPerPage: 20,
        onPageChanged: handlePageChanged,
        onAmountPerPageChanged: handleAmountPerPageChanged,
    });

    const itemActions = [
        {
            label: t('samplesView'),
            icon: <VisibilityIcon fontSize="inherit" />,
            onClick: openDetailsModal,
        },
        {
            label: t('samplesMap'),
            icon: <PublicIcon fontSize="inherit" />,
            disabled: (sample) => !sample.lat,
            onClick: openMapModal,
        },
        {
            label: t('samplesEdit'),
            icon: <EditIcon fontSize="inherit" />,
            onClick: openEditModal,
        },
        {
            label: t('samplesDelete'),
            icon: <DeleteIcon fontSize="inherit" />,
            onClick: openDeleteOneModal,
        },
    ];

    const commonActions = [
        {
            label: t('samplesCreate'),
            onClick: openEditModal,
            skip: false,
        },
        {
            label: t('samplesDeleteAll'),
            onClick: openDeleteAllModal,
            skip: samplesAmount === 0,
        },
        {
            label: t('samplesDeleteSelected'),
            onClick: openDeleteSelectedModal,
            skip: Object.keys(selected).length === 0,
        },
    ].filter((i) => i.skip === false);

    useEffect(() => {
        if (storedSamples === undefined) {
            loadSamples();
        }
    }, [type, storedSamples]);

    useEffect(() => {
        if (loading && storedSamples !== undefined) {
            setLoading(false);
        }
    }, [storedSamples]);

    function loadSamples({ newOrder, newOrderBy, search, newPage, newAmountPerPage } = {}) {
        setLoading(true);

        const currentOrder = newOrder || order;
        const currentOrderBy = newOrderBy || orderBy;

        const params = {
            type,
            search: search === undefined ? searchText : search,
            sort: currentOrder === 'asc' ? `+${currentOrderBy}` : `-${currentOrderBy}`,
            offset: (newPage === undefined ? paginationData.currentPage : newPage) * paginationData.rowsPerPage,
            limit: newAmountPerPage || paginationData.rowsPerPage,
        };

        req(`${urls.GET_SAMPLES.path}?${encodeGetParams(params)}`, urls.GET_SAMPLES.method)
            .then((data) => {
                dispatch(updateSamples({ ...data, type }));
            })
            .catch(() => {
                setServerError(t('samplesServerError'));
                setLoading(false);
            });
    }

    function loadSpecies() {
        req(urls.GET_SPECIES.path, urls.GET_SPECIES.method)
            .then((data) => {
                setModalData(modals.edit.name, { species: data.species });
                setModalLoading(modals.edit.name, false);
                dispatch(updateSpecies(data.species));
            })
            .catch(() => {
                setServerError(t('samplesServerError'));
                closeModal(modals.edit.name);
            });
    }

    const loadMapSamples = (nameLat) => {
        req(`${urls.GET_SAMPLES.path}?type=${type}&search=${nameLat}`, urls.GET_SAMPLES.method)
            .then((data) => {
                setModalData(modals.map.name, { samples: data.list });
                setModalLoading(modals.map.name, false);
            })
            .catch(() => {
                setServerGeneralError(modals.map.name, t('errorServerError'));
                setModalLoading(modals.map.name, false);
            });
    };

    const edit = (sample) => {
        setModalLoading(modals.edit.name, true);
        setModalData(modals.edit.name, { sample });

        const onError = async (error) => {
            if (error.status === 409) {
                setServerGeneralError(modals.edit.name, t('errorServerCheckYourData'));
            } else if (error.status === 422) {
                setServerValidationErrors(modals.edit.name, await parseErrors(error));
            } else {
                setServerGeneralError(modals.edit.name, t('errorServerError'));
            }
            setModalLoading(modals.edit.name, false);
        };

        if (sample.id) {
            req(urls.UPDATE_SAMPLE.path.replace(':id', sample.id), urls.UPDATE_SAMPLE.method, { ...sample })
                .then(() => {
                    closeModal(modals.edit.name);
                    dispatch(updateSample(sample));
                })
                .catch(onError);
        } else {
            req(urls.CREATE_SAMPLE.path, urls.CREATE_SAMPLE.method, { ...sample })
                .then((data) => {
                    closeModal(modals.edit.name);
                    dispatch(createSample({ ...sample, id: data.id }));
                })
                .catch(onError);
        }
    };

    const deleteOne = () => {
        setModalLoading(modals.deleteOne.name, true);

        req(urls.DELETE_SAMPLE.path.replace(':id', modals.deleteOne.data.sampleId), urls.DELETE_SAMPLE.method)
            .then(() => {
                closeModal(modals.deleteOne.name);
                dispatch(deleteSamples({ type, ids: [modals.deleteOne.data.sampleId] }));
            })
            .catch(() => {
                setModalLoading(modals.deleteOne.name, false);
                setServerGeneralError(modals.deleteOne.name, t('errorServerError'));
            });
    };

    const deleteAll = () => {
        setModalLoading(modals.deleteAll.name, true);

        req(`${urls.DELETE_ALL_SAMPLES.path}?type=${type}`, urls.DELETE_ALL_SAMPLES.method)
            .then(() => {
                closeModal(modals.deleteAll.name);
                dispatch(deleteAllSamples({ type }));
            })
            .catch(() => {
                setModalLoading(modals.deleteAll.name, false);
                setServerGeneralError(modals.deleteAll.name, t('errorServerError'));
            });
    };

    const deleteSelected = () => {
        setModalLoading(modals.deleteSelected.name, true);

        req(`${urls.DELETE_SELECTED_SAMPLES.path}?type=${type}`, urls.DELETE_SELECTED_SAMPLES.method, {
            ids: Object.keys(selected),
        })
            .then(() => {
                skipSelected();
                closeModal(modals.deleteSelected.name);
                dispatch(deleteSamples({ type, ids: Object.keys(selected) }));
            })
            .catch(() => {
                setModalLoading(modals.deleteSelected.name, false);
                setServerGeneralError(modals.deleteSelected.name, t('errorServerError'));
            });
    };

    function onSort(newOrder, newOrderBy) {
        loadSamples({ newOrder, newOrderBy });
    }

    function openEditModal(sample = {}) {
        openModal(modals.edit.name);
        setModalData(modals.edit.name, { type, sample });
        if (species.length === 0) {
            setModalLoading(modals.edit.name, true);
            loadSpecies();
        }
    }

    function openDeleteOneModal(sample) {
        setModalData(modals.deleteOne.name, {
            type,
            sampleName: sample.nameLat,
            sampleId: sample.id,
            sampleCode: sample.code,
        });

        openModal(modals.deleteOne.name);
        setModalLoading(modals.deleteOne.name, false);
    }

    function openDeleteAllModal() {
        openModal(modals.deleteAll.name);
        setModalLoading(modals.deleteAll.name, false);
    }

    function openDeleteSelectedModal() {
        openModal(modals.deleteSelected.name);
        setModalLoading(modals.deleteSelected.name, false);
    }

    function openMapModal(sample) {
        setModalData(modals.map.name, { type, sample, samples: [] });
        openModal(modals.map.name);
        setModalLoading(modals.map.name, true);
        loadMapSamples(sample.nameLat);
    }

    function openDetailsModal(sample) {
        setModalData(modals.details.name, { type, sample });
        openModal(modals.details.name);
        setModalLoading(modals.details.name, false);
    }

    const handleSearchSamples = (searchText) => {
        setSearchText(searchText);
        loadSamples({ search: searchText });
    };

    const handleClearSearchInput = () => {
        setSearchText('');
        loadSamples({ search: '' });
    };

    function handlePageChanged(newPage) {
        loadSamples({ newPage });
    }

    function handleAmountPerPageChanged(newAmountPerPage) {
        loadSamples({ newPage: 0, newAmountPerPage });
    }

    const openModal = (name) => {
        dispatchModals({ type: a.OPEN, name });
    };

    const closeModal = (name) => {
        dispatchModals({ type: a.CLOSE, name });
    };

    const setModalData = (name, data) => {
        dispatchModals({ type: a.DATA, name, data });
    };

    const setModalLoading = (name, loading) => {
        dispatchModals({ type: a.LOADING, name, loading });
    };

    const setServerGeneralError = (name, error) => {
        dispatchModals({ type: a.SERVER_GENERAL_ERROR, name, error });
    };

    const setServerValidationErrors = (name, errors) => {
        dispatchModals({ type: a.SERVER_VALIDATION_ERRORS, name, errors });
    };

    const EditModalComponent = (
        <EditModal
            isNewSample={!modals.edit.data.sample || !modals.edit.data.sample.id}
            open={modals.edit.open}
            loading={modals.edit.loading}
            data={modals.edit.data}
            serverGeneralError={modals.edit.serverGeneralError}
            serverValidationErrors={modals.edit.serverValidationErrors}
            onClose={() => closeModal(modals.edit.name)}
            onSave={edit}
        />
    );

    if (storedSamples !== undefined && samplesAmount === 0 && !searchText) {
        return <NoContent visible={true} modal={EditModalComponent} openModal={openEditModal} />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <UpperPanel
                actions={commonActions}
                handleClearSearchInput={handleClearSearchInput}
                handleSearchSamples={handleSearchSamples}
            />

            <AlertError visible={!loading && !!serverError} text={serverError} />

            <SamplesTable
                visible={!serverError}
                loading={loading}
                canManageData={samplesAmount > 0}
                selected={selected}
                columns={columns}
                orderBy={orderBy}
                order={order}
                itemActions={itemActions}
                samples={samples}
                handleSelectOne={handleSelectOne}
                handleSelectAll={handleSelectAll}
                areSelectedAll={areSelectedAll()}
                handleSort={handleSort}
                emptyRowsCount={paginationData.getEmptyRowsCount()}
            />

            <Pagination
                rowsPerPageOptions={[20, 50, 100, 300]}
                visible={!loading && !serverError}
                paginationData={paginationData}
            />

            {EditModalComponent}

            <DetailsModal
                open={modals.details.open}
                loading={modals.details.loading}
                data={modals.details.data}
                onClose={() => closeModal(modals.details.name)}
            />
            <MapModal
                open={modals.map.open}
                loading={modals.map.loading}
                data={modals.map.data}
                onClose={() => closeModal(modals.map.name)}
                serverGeneralError={modals.map.serverGeneralError}
            />
            <DeleteOneModal
                open={modals.deleteOne.open}
                loading={modals.deleteOne.loading}
                data={modals.deleteOne.data}
                onClose={() => closeModal(modals.deleteOne.name)}
                onConfirm={deleteOne}
                serverGeneralError={modals.deleteOne.serverGeneralError}
            />
            <DeleteAllModal
                open={modals.deleteAll.open}
                loading={modals.deleteAll.loading}
                onClose={() => closeModal(modals.deleteAll.name)}
                onConfirm={deleteAll}
                serverGeneralError={modals.deleteAll.serverGeneralError}
            />
            <DeleteSelectedModal
                open={modals.deleteSelected.open}
                loading={modals.deleteSelected.loading}
                onClose={() => closeModal(modals.deleteSelected.name)}
                onConfirm={deleteSelected}
                serverGeneralError={modals.deleteSelected.serverGeneralError}
            />
        </Box>
    );
}

List.propTypes = {
    type: PropTypes.oneOf(Object.values(sampleTypes)).isRequired,
    visible: PropTypes.bool.isRequired,
};

List.whyDidYouRender = false;

export default List;

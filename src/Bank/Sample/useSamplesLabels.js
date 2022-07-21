import { useTranslation } from 'react-i18next';

const useSamplesLabels = () => {
    const { t } = useTranslation();

    return {
        code: t('samplesCode'),
        nameLat: t('samplesNameLat'),
        interiorCode: t('samplesInteriorCode'),
        date: t('samplesDate'),
        place: t('samplesPlace'),
        material: t('samplesMaterial'),
        sex: t('samplesSex'),
        age: t('samplesAge'),
        responsible: t('samplesResponsible'),
        description: t('samplesDescription'),
        ringNumber: t('samplesRing'),
        company: t('samplesCompany'),
        cs: t('samplesCs'),
        sr: t('samplesSr'),
        waterbody: t('samplesWaterbody'),
        dna: t('samplesDna'),
        lat: t('samplesLat'),
        lon: t('samplesLon'),
    };
};

export default useSamplesLabels;

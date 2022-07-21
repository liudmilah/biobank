import { useContext } from 'react';
import FeaturesContext from './FeaturesContext';

const useFeatures = () => useContext(FeaturesContext);

export default useFeatures;

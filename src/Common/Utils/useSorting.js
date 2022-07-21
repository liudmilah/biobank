import { useEffect, useState } from 'react';

function getComparator(orderBy, order) {
    const compare = (a, b, orderBy) => (a[orderBy] > b[orderBy] && 1) || -1;
    return order === 'desc' ? (a, b) => -compare(a, b, orderBy) : (a, b) => compare(a, b, orderBy);
}

function sort(data, orderBy, order) {
    return data.slice().sort(getComparator(orderBy, order));
}

function useSorting(data, defaultOrderBy, defaultOrder, onSort = () => null) {
    const sortResult = sort(data, defaultOrderBy, defaultOrder);

    const [sortedData, setSortedData] = useState(sortResult);
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);

    useEffect(() => {
        setSortedData(sort(data, orderBy, order));
    }, [data]);

    const handleSort = (newOrderBy) => (e) => {
        const isAsc = orderBy === newOrderBy && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';

        setOrder(newOrder);
        setOrderBy(newOrderBy);
        setSortedData(sort(sortedData, newOrderBy, newOrder));

        onSort(newOrder, newOrderBy);
    };

    return {
        sortedData,
        handleSort,
        order,
        orderBy,
    };
}

export default useSorting;

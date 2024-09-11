import {useState} from 'react';

function useSort(headers, body) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const sortByColumn = (columnId) => {
        if (sortBy && columnId !== sortBy) {
            setSortOrder('asc');
            setSortBy(columnId);
            return;
        }
        if (sortOrder === null) {
            setSortOrder('asc');
            setSortBy(columnId);
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
            setSortBy(columnId);
        } else if (sortOrder === 'desc') {
            setSortOrder(null);
            setSortBy(null);
        }
    };

    let sortedData = body;
    if (sortOrder && sortBy) {
        const { sortValue } = headers.find(column => column.id === sortBy);
        sortedData = [...body].sort((a, b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);
            const reverseOrder = sortOrder === 'asc' ? 1 : -1;
            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return (valueA - valueB) * reverseOrder;
            }
        });

    }

    return {
        sortedData,
        sortByColumn,
        sortOrder,
        sortBy
    }
}
export default useSort;

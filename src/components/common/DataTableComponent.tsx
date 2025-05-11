import React, { useEffect, useState } from 'react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import IconPlus from '../Icon/IconPlus';
import { Link } from 'react-router-dom';

interface TableRow {
    id: number;
    [key: string]: any;
}

interface DataTableComponentProps {
    data: TableRow[];
    columns: any;
    createPage: string;
}

const PAGE_SIZES = [10, 20, 30, 50, 100];

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, columns, createPage }) => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TableRow[]>(data);
    const [recordsData, setRecordsData] = useState<TableRow[]>(initialRecords);
    const [search, setSearch] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [selectedRecords, setSelectedRecords] = useState<TableRow[]>([]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return data.filter((item) => {
                return Object.values(item).some((val) => val?.toString().toLowerCase().includes(search.toLowerCase()));
            });
        });
    }, [search, data]);

    useEffect(() => {
        if (sortStatus) {
            setRecordsData((prevRecords) => {
                return [...prevRecords].sort((a, b) => {
                    const aValue = a[sortStatus.columnAccessor];
                    const bValue = b[sortStatus.columnAccessor];

                    if (aValue < bValue) return sortStatus.direction === 'asc' ? -1 : 1;
                    if (aValue > bValue) return sortStatus.direction === 'asc' ? 1 : -1;
                    return 0;
                });
            });
        }
    }, [sortStatus]);

    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                {createPage && (
                    <div className="flex gap-2 align-bottom">
                        {/* <Link to={createPage} className="btn btn-primary gap-2">
                            <IconPlus />
                            Create
                        </Link> */}
                    </div>
                )}
                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="datatables">
                <DataTable
                    className="whitespace-nowrap table-hover invoice-table"
                    highlightOnHover
                    records={recordsData}
                    columns={columns}
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={setPage}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    selectedRecords={selectedRecords}
                    onSelectedRecordsChange={setSelectedRecords}
                    paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default DataTableComponent;

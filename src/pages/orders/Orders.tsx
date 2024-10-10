import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import OrdersModel from "./model";
import AppDataGrid from "components/common/datagrid/DataGrid";
import { ordersServices, ordersStatuesServices } from "lib/apis/orders/orderServices";
import AppEmptyPage from "components/common/empty/AppEmptyPage";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IordersServices } from "lib/apis/orders/interfaces";
import { exportOrdersReportService } from "lib/apis/order/services";
import useAppToast from "functions/hooks/toast/useToast";
import { AxiosError } from "axios";
import useGrowthHackStore from "lib/stores/growth-hack/useGrowthHackStore";

function Orders() {
    const { mutate, isLoading, data } = useMutation((params: IordersServices) => ordersServices(params));
    const [isFetchingOrdersReport, setFetchingOrdersReport] = useState(false);
    const statues = useMutation(() => ordersStatuesServices());
    const { growthHackData, fetchGrowthHackData } = useGrowthHackStore();

    const [States, setStates] = useState({
        search: null,
    });
    const orders = useMemo(() => data?.data?.data, [data]);
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useAppToast();
    const [searchParams] = useSearchParams();
    const page = useMemo(() => parseInt(searchParams.get("page")), [searchParams]) || 1;

    const fetch = useCallback(async() => {
        const status = searchParams.get("status");
        mutate({ page, status });
        if(orders?.data?.length && !growthHackData?.list?.sellFirstProduct) await fetchGrowthHackData()
    }, [page, searchParams]);

    useEffect(() => {
        fetch();
    }, [mutate, page, searchParams]);
    useEffect(() => {
        statues.mutate();
    }, []);

    const updateFilters = useCallback(
        (key: string, value: string) => {
            if (searchParams.get(key) === value) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, value);
                searchParams.set("page", "1");
            }
            navigate(`${location.pathname}?${searchParams.toString()}`);
        },
        [searchParams, location]
    );

    const setSearch = useCallback((keyword: string) => setStates((prev) => ({ ...prev, search: keyword })), []);

    // Handle search and without search
    const rows = useMemo(() => {
        return data
            ? OrdersModel.refactorData({
                  data: data.data.data?.data,
                  search: States.search,
              })
            : [];
    }, [States.search, data]);

    const handleExportOrdersReport = async () => {
        try {
            setFetchingOrdersReport(true);
            const data = await exportOrdersReportService();
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${Date.now()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            showToast({ message: (error as AxiosError).message, type: "error" });
        } finally {
            setFetchingOrdersReport(false);
        }
    };

    return (
        <>
            <AppDataGrid
                loading={isLoading}
                rows={rows}
                buttons={[
                    {
                        caption: "Export",
                        onClick: handleExportOrdersReport,
                        buttonProps: {
                            isDisabled: isFetchingOrdersReport,
                            isLoading: isFetchingOrdersReport,
                        },
                    },
                ]}
                search={{ onChange: (e) => setSearch(e.target.value) }}
                empty={<AppEmptyPage title="No orders available yet!" />}
                pagination={{
                    lastPage: orders?.totalPages ? parseInt(orders?.totalPages) : 1,
                    current: page,
                    nextPage: orders?.hasNextPage || false,
                    prevPage: orders?.hasPreviousPage || false,
                }}
                filters={[
                    {
                        title: "Status",
                        list: statues?.data?.data?.data
                            ? statues?.data?.data?.data.map((el) => ({
                                  title: el.caption,
                                  onClick: () => updateFilters("status", el.value),
                                  isActive: searchParams.get("status") === el.value,
                              }))
                            : [],
                    },
                ]}
            />
        </>
    );
}

export default Orders;

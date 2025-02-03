import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PaginationComp = ({ totalPage = 5, path = "accounts", setPage, page }) => {
    console.log(totalPage, path, page);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle page changes
    const handlePageChange = (event, value) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("page", value);
        const newUrl = `/${path}?${queryParams.toString()}`;
        navigate(newUrl);
        setPage(value);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(queryParams.get("page"), 10);
        if (!isNaN(pageFromUrl)) {
            setPage(pageFromUrl);
        }
    }, [location.search]);

    return (
        <div className="pagination justify-content-center">
            <Pagination
                count={totalPage}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#000',  // Text color of pagination items
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#EC4E54 !important',  // Background color of selected page item
                        color: 'white !important',  // Text color of selected page item
                    },
                    '& .MuiPaginationItem-ellipsis': {
                        color: '#000',  // Color of ellipsis
                    }
                }}
            />
        </div>
    );
};

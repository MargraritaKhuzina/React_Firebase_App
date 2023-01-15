import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMeetengs, setSelectedMeetengs] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    // колличество вмещаемых объектов на странице
    const pageSize = 4;

    // Пагинация
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleSearchQuery = ({ target }) => {
        setSelectedMeetengs(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            // сортирует пользователей по имени и по колличеству встреч
            const filteredUsers = searchQuery
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedMeetengs
                ? data.filter(
                      (user) =>
                          user.completedMeetings
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : data;
            // исключает из списка конкретного пользователя (пользователь не видит сам себя в общем списке)
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        // paginate - функция из utils
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <div className="d-flex flex-column ">
                    <SearchStatus length={count} />
                    <input
                        className="mt-2 mb-3"
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center mt-2">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;

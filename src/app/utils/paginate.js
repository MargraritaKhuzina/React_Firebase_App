// функция используется для пагинации на странице userListPage

// items - объекты на странице
// pageNumber - номер страницы
// pageSize - количество вмещаемых объектов на странице
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}

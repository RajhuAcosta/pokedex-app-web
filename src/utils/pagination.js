const paginateData = (items,currentPage) => {
    const itemsPerPage = 20;
    const sliceEnd = currentPage*itemsPerPage;
    const sliceStart = sliceEnd-itemsPerPage;
    const itemsInCurrentPage = items.slice(sliceStart,sliceEnd);
    const lastPage = Math.ceil(items.length/itemsPerPage);
    const pagesPerBlock = 5;
    const actualBlock = Math.ceil(currentPage/pagesPerBlock);
    const pagesInCurrentBlock = [];
    const maxPage = actualBlock*pagesPerBlock;
    const minPage = (maxPage-pagesPerBlock) + 1;
    for (let i = minPage; i <= maxPage; i++) {
        if (i<=lastPage) {
            pagesInCurrentBlock.push(i);
        }
    }
    return {
        itemsInCurrentPage,
        pagesInCurrentBlock,
        lastPage,
    }
}

export {
    paginateData
}
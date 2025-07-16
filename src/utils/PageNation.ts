function PageNation(currentPage: number, totalPages: number): number[] {
  const pageBtn = 10;
  let start = Math.max(0, currentPage - Math.floor(pageBtn / 2));
  let end = start + pageBtn;

  if(end > totalPages){
    end = totalPages;
    start = Math.max(0, end - pageBtn)
  }
  
  const pages = [];
  for(let i = start; i < end; i++){
    pages.push(i);
  }
  return pages;
}

export default PageNation
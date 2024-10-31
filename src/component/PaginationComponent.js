import { Pagination, PaginationItem } from "@mui/material";

const PaginationComponent = ({ page, totalPages, setCurrentPageNo }) => {
  return (
    <div className="paginationBox">
      <Pagination
        page={page}
        count={totalPages}
        onChange={(event, value) => setCurrentPageNo(value)} // Set the new page
       
        
      />
    </div>
  );
};

export default PaginationComponent;

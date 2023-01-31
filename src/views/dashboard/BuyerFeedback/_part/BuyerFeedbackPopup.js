import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DataTable from 'react-data-table-component';
import { getAllOrders } from 'redux/action/Order';
import { column_Product_review_listing } from 'views/utilities/extra';
import { Rating, Stack } from '@mui/material';
import { base_url } from 'utils/config';
import { formatedDate } from 'utils/helper';
function BuyerFeedbackPopup({ setVisible, open }) {
    const [searchData, setsearchData] = useState('');
    const [row, setrow] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { all_products_reviews } = useSelector((state) => state._product);
    console.log('Reviews Listing', all_products_reviews);
    // useEffect(() => {
    //     setLoading(false);
    //     dispatch(getAllOrders());
    // }, []);

    useEffect(() => {
        setLoading(false);
        if (all_products_reviews) {
            makeRow();
        }
    }, [all_products_reviews]);
    const handleClickOpen = () => {
        setVisible(false);
    };

    const handleClose = () => {
        setVisible(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const makeRow = () => {
        var data =
            Array.isArray(all_products_reviews?.reviews) && all_products_reviews?.reviews.length > 0
                ? all_products_reviews?.reviews.map((review, id) => ({
                      _id: review?._id,
                      buyer: (
                          <div className="d-flex align-items-center">
                              <div className="product-img">
                                  <img
                                      src={
                                          review?.createdBy?.profile?.includes('http')
                                              ? review?.createdBy?.profile
                                              : base_url + review?.createdBy?.profile
                                      }
                                      style={{
                                          objectFit: 'cover',
                                          height: '40px',
                                          width: '40px',
                                          borderRadius: '10px'
                                      }}
                                  />
                              </div>
                          </div>
                      ),
                      name: <p>{review?.createdBy?.fullname}</p>,
                      reviewNote: <p>{review?.review}</p>,
                      replyNote: <p>{''}</p>,
                      rating: (
                          <div>
                              <Stack spacing={1}>
                                  <Rating name="size-small" value={review?.rating} size="small" />
                              </Stack>
                          </div>
                      ),
                      average: <p>{review?.rating} / 5</p>,
                      date: <p>{formatedDate(review?.created_at)}</p>,
                    //   action: (
                    //       <>
                    //           <button className="detail-btn">Reply</button>
                    //       </>
                    //   )
                  }))
                : [];
        console.log('Row Data', all_products_reviews?.reviews);
        setrow(data);
    };

    return (
        <div>
            <Dialog
                open={open}
                maxWidth="xl"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="model"
            >
                <div className="approval-detail-popup">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Product Details</h2>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <div className="tabel">
                        <div style={{ height: 400, width: '100%' }}>
                            <DataTable
                                columns={column_Product_review_listing}
                                data={searchData ? searchData : row}
                                defaultSortFieldId={1}
                                sortIcon={<ArrowDownwardIcon />}
                                // onSelectedRowsChange={(data) => selectedDataRow(data)}
                                pagination
                                selectableRows
                                responsive
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default BuyerFeedbackPopup;

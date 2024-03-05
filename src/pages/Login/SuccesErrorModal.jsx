import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login/Login.css'

function SuccesErrorModal({ err, success, setError, setSuccess }) {

  // const showSuccessToast = () => {
  //   toast.success("Bạn đã đăng ký thành công tài khoản tại F8.", { autoClose: 5000 });
  // };

  // const showErrorToast = () => {
  //   toast.error("Có lỗi xảy ra, vui lòng liên hệ quản trị viên.", { autoClose: 5000 });
  // };

  useEffect(() => {
    if (success) {
      toast.success(success, { autoClose: 5000 });
      setSuccess(null); // success muvaffaqiyatli chiqqanda qayta ishlamay qolishi uchun null qilamiz
    }
  }, [success]);

  useEffect(() => {
    if (err) {
      toast.error(err, { autoClose: 5000 });
      setError(null); // err xatolik yuz berib chiqqanda qayta ishlamay qolishi uchun null qilamiz
    }
  }, [err]);

  return (
    <div>
      {/* <div>
        <button onClick={showSuccessToast} className="btn btn--success">Show success toast</button>
        <button onClick={showErrorToa   st} className="btn btn--danger">Show error toast</button>
      </div> */}
      <ToastContainer />
    </div>
  );
}
export default SuccesErrorModal

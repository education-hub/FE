import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutAdmin } from "../../components/Layout";
import { ButtonCancelDelete, ButtonSubmit } from "../../components/Button";

const AddSchool: FC = () => {
  return (
    <LayoutAdmin>
      <div className="grid grid-cols-2 px-20 py-20">
        <div>left</div>
        <div>right</div>
      </div>
    </LayoutAdmin>
  );
};

export default AddSchool;

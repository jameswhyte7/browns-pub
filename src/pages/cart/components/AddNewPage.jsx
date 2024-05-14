import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Menu from "../../home/components/Menu";

function AddNewPage({ open, handler }) {
  const handleClose = () => window.location.reload();

  return (
    <Dialog
      open={open}
      handler={handler}
      size="lg"
      dismiss={() => window.location.reload()}
    >
      <DialogHeader className="justify-between">
        <Typography variant="h4" color="black">
          Add New Item
        </Typography>
        <Button onClick={handleClose}>Done</Button>
      </DialogHeader>
      <DialogBody className="h-[42rem] overflow-scroll">
        <Menu />
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleClose}>Done</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddNewPage;

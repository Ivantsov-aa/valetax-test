import React, {useState} from "react";
import {useMutation} from "react-query";
import {TreeApi} from "../../shared/tree";
import {TREE_NAME} from "../../shared/constants";
import {Box} from "@mui/material";
import {RichTreeView} from "@mui/x-tree-view";
import {CustomTreeItem} from "./TreeItem";
import Modal from "../Modal/Modal";

const Tree = () => {
  const [modalParams, setModalParams] = useState(null);
  const [tree, setTree] = useState(null);

  const {mutate} = useMutation(
    () => TreeApi.get(TREE_NAME), 
    {
      onSuccess: ({data}) => setTree(data)
    },
  );

  if (!tree) {
    return mutate();
  };
  
  return <Box 
    sx={{
      width: "100%",
      height: "100%"
    }}
  >
    <RichTreeView 
      items={[tree]}
      slots={{item: CustomTreeItem}}
      getItemId={(item) => "" + item.id}
      getItemLabel={(item) => item.name}
      slotProps={{
        item: {
          onActionClick: (params) => setModalParams(params)
        }
      }}
    />
    <Modal
      modalParams={modalParams}
      setModalParams={setModalParams}
      mutate={mutate}
    />
  </Box>;
}

export default Tree;

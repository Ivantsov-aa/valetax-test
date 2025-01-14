import React from "react";
import {Box, ButtonGroup, IconButton, styled, Typography} from "@mui/material";
import {TreeItem2Content, TreeItem2DragAndDropOverlay, TreeItem2GroupTransition, TreeItem2Icon, TreeItem2IconContainer, TreeItem2Label, TreeItem2Provider, TreeItem2Root, useTreeItem2 } from "@mui/x-tree-view";
import {AddCircleOutline, DeleteOutline, EditOutlined} from "@mui/icons-material";
import {TreeApi} from "../../shared/tree";
import {TREE_NAME} from "../../shared/constants";

const modalsMap = {
  add: {
    title: "Add node",
    input: true,
    button: {
      text: "Add",
      variant: "contained"
    },
    action: async ({id, name}) => {
      return TreeApi.create({
        treeName: TREE_NAME,
        parentNodeId: id,
        nodeName: name
      });
    }
  },
  rename: {
    title: "Rename node",
    label: "New node name",
    input: true,
    button: {
      text: "Rename",
      variant: "contained"
    },
    action: async ({id, name}) => {
      return TreeApi.rename({
        treeName: TREE_NAME,
        nodeId: id,
        newNodeName: name
      });
    }
  },
  delete: {
    title: "Delete node",
    button: {
      text: "Delete",
      color: "error"
    },
    action: async ({id}) => {
      return TreeApi.delete({
        treeName: TREE_NAME,
        nodeId: id
      });
    }
  }
};

const CustomTreeItemContent = styled(TreeItem2Content)(({theme}) => ({
  padding: theme.spacing(0.5, 1),
}));

export const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const {id, itemId, label, disabled, children, siblings, onActionClick, ...other} = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const handleAddNodeClick = (e) => {
    e.stopPropagation();

    onActionClick({
      ...modalsMap.add,
      name: "",
      id: itemId,
    });
  };

  const handleRenameNodeClick = (e) => {
    e.stopPropagation();

    onActionClick({
      ...modalsMap.rename,
      prevName: label,
      id: itemId,
    });
  };

  const handleDeleteNodeClick = (e) => {
    e.stopPropagation();
    
    onActionClick({
      ...modalsMap.delete,
      name: label,
      id: itemId,
    });
  };
  
  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent {...getContentProps()}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {label}
            </Typography>
            <ButtonGroup>
              <IconButton color="primary" onClick={handleAddNodeClick}>
                <AddCircleOutline />
              </IconButton>
              {label !== TREE_NAME && (
                <>
                  <IconButton color="primary" onClick={handleRenameNodeClick}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton color="secondary" onClick={handleDeleteNodeClick}>
                    <DeleteOutline />
                  </IconButton>
                </>
              )}
            </ButtonGroup>
          </Box>
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && (
          <TreeItem2GroupTransition
            {...getGroupTransitionProps()}
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

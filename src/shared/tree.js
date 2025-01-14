import {axiosClient} from "./axiosClient";

export const TreeApi = {
  async get(treeName) {
    return axiosClient({
        url: "/api.user.tree.get",
        method: "POST",
        params: {treeName}
    })
  },
  async create(tree) {
      return axiosClient({
          url: "/api.user.tree.node.create",
          method: "POST",
          params: tree
      })
  },
  async delete(tree) {
      return axiosClient({
          url: "/api.user.tree.node.delete",
          method: "POST",
          params: tree
      })
  },
  async rename(tree) {
      return axiosClient({
          url: "/api.user.tree.node.rename",
          method: "POST",
          params: tree
      })
  }
};

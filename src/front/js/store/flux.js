const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      BACKEND_URL:
        "https://3001-s3rtr3s-petsfriends-00lslwimxf5.ws-eu90.gitpod.io/",
      clientInfo: {},
    },
    actions: {
      setClientInfo: () => {
        const client = JSON.parse(localStorage.getItem("clientInfo"));
        setStore({ ...getStore(), clientInfo: client });
      },
      logout: () => {
        localStorage.removeItem("clientInfo");
        setStore({ ...getStore(), clientInfo: {} });
      },
      setLocalStorage: (client) => {
        localStorage.setItem("clientInfo", JSON.stringify(client))
      },
      uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('client_id', getStore().clientInfo.id);
        
        const options = {
          method: 'POST',
          body: formData,
        };
        
        const resp = await fetch(getStore().BACKEND_URL + "api/upload", options)
        const data = await resp.json()
        return data
      }
    },
  };
};

export default getState;

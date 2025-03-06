interface EnvVariables {
  apiRoot: string;
}

const env: EnvVariables = {
  apiRoot: `${import.meta.env.VITE_BACKEND_ROOT || ""}api/`,
};

export default env;

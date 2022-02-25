type NodeEnv = 'development' | 'production' | 'test' | undefined;

interface UseEnvironment {
    current: NodeEnv;
    test: boolean;
    production: boolean;
    development: boolean;
}

/**
 * It returns an object with the current environment and a boolean indicating if the current
 * environment is `test`, `production`, or `development`.
 * @returns The `useEnvironment` hook returns an object with the following properties:
 */
export const useEnvironment = () => {
    const current = process.env['NODE_ENV'] as NodeEnv;

    const environment: UseEnvironment = {
        current: current,
        test: current === 'test',
        production: current === 'production',
        development: current === 'development',
    };

    return environment;
};

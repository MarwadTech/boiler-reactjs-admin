import LoadingBar from "react-top-loading-bar";

export const LoadingTopBar = ({ Progress }) => {
    return (
        <LoadingBar color={'#ffff'} progress={Progress} onLoaderFinished={0} height={1.5} />
    );
};
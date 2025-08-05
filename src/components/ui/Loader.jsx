import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ loading }) {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <ClipLoader
                color="#d9832e"
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

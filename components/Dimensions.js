export default function Dimensions({ width, height }) {
    if (typeof window === 'undefined'
        || isNaN(width)
        || isNaN(height)
    ) {
        return null;
    }

    const dpr = window.devicePixelRatio;

    return (
        <>
            <p style={{
                textAlign: "center"
            }}>
                <span className="dimension">{width * dpr}</span>
                {`px × `}
                <span className="dimension">{height * dpr}</span>
                {`px`}
                <DevicePixelRatioText dpr={dpr} />
            </p>

            {/*language=CSS*/}
            <style jsx>{`
                .dimension {
                    font-weight: bold;
                    color: #5d90bc;
                }
            `}</style>
        </>
    )
}

function DevicePixelRatioText({ dpr }) {
    if (dpr <= 1) {
        return null;
    }

    return (
        <>
            <br />
            {`Your device pixel ratio is `}
            <span className="dimension">
                {dpr}
            </span>
            {`.`}
        </>
    )
}

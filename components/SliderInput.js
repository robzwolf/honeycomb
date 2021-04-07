export default function SliderInput(props) {
    return (
        <div className="slider-input">
            <input
                type="range"
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.onChange}
            />
            <input
                type="number"
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.onChange}
            />
            <input
                type="button"
                value="Default"
                onClick={props.setDefault}
            />

            {/*language=CSS*/}
            <style jsx>{`
                /* Wrapper styles */
                .slider-input {
                    display: flex;
                    margin: 20px 0;
                }
            `}</style>
        </div>
    )
}

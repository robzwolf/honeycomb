export default function DataCell({column, value, onChange, additionalProps}) {
    return (
        <>
            <input
                type="text"
                className={`form-cell fc-${column}`}
                name={column}
                value={value}
                onChange={onChange}
                required={true}
                {...additionalProps}
            />

            {/*language=CSS*/}
            <style jsx>{`
                .form-cell {
                    font-size: 14px;
                    height: 29px;
                    border: 1px solid #5d90bc;
                    background: #eef8ff;
                    border-radius: 4px;
                    padding: 4px;
                    font-family: 'Roboto Mono', monospace;
                }
                
                input[type="checkbox"] {
                    position: relative;
                    top: -2px;
                }
            `}</style>
        </>
    )
}

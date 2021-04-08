const API_ROUTE = '/api/get-png'

export default function DownloadButton({downloading, setDownloading}) {
    function downloadImage() {
        setDownloading(true);
        const html = document.querySelector('html').outerHTML;
        fetch(API_ROUTE, {
            method: 'POST',
            body: html,
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            const buffer = Buffer.from(arrayBuffer)
            const base64Image = buffer.toString('base64')
            console.log('base64 image is:', base64Image)

            const imgEl = document.createElement('img')
            imgEl.src = `data:image/png;base64,${base64Image}`

            const downloadLink = document.createElement('a')
            downloadLink.href = imgEl.src
            downloadLink.download = 'honeycomb.png'
            downloadLink.click()

            setDownloading(false);
        })
    }

    return (
        <>
            <button
                disabled={downloading}
                className="download-button"
                onClick={downloadImage}
            >
                {downloading
                    ? <img src="/loading.svg"/>
                    : <span>Download as PNG</span>
                }
            </button>

            {/*language=CSS*/}
            <style jsx>{`
                .download-button {
                    width: 200px;
                    height: 49px;
                    padding: 4px 34px;
                }

                .download-button img {
                    max-width: 100%;
                    max-height: 100%;
                }
            `}</style>
        </>
    )
}

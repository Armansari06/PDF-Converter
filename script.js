/* =========================================================
   FILETOOLS - PDF & IMAGE TOOLS
   ========================================================= */

console.log(
    "PDF.js loaded:",
    typeof pdfjsLib
);

let selectedImages = [];
let draggedIndex = null;

let mergeFiles = [];
let mergeDraggedIndex = null;


/* =========================================================
   PDF.JS WORKER
   ========================================================= */

if (typeof pdfjsLib !== "undefined") {

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

}


/* =========================================================
   OPEN TOOL
   ========================================================= */

function openTool(tool) {

    const area =
        document.getElementById("tool-area");

    if (!area) {
        return;
    }


    /* =====================================================
       JPG TO PDF
       ===================================================== */

    if (tool === "jpg-pdf") {

        selectedImages = [];
        draggedIndex = null;

        area.innerHTML = `

            <h2>
                JPG to PDF
            </h2>

            <p>
                Convert JPG or PNG images into a PDF file.
            </p>


            <div
                id="dropZone"
                class="drop-zone"
            >

                <div class="upload-icon">
                    📁
                </div>

                <h3>
                    Drag & Drop your images here
                </h3>

                <p>
                    or
                </p>

                <label
                    for="imageInput"
                    class="choose-btn"
                >
                    Choose Images
                </label>

                <input
                    type="file"
                    id="imageInput"
                    accept="image/jpeg,image/png"
                    multiple
                    hidden
                >

                <small>
                    JPG and PNG files supported
                </small>

            </div>


            <div
                id="previewContainer"
                class="preview-container"
            ></div>


            <div
                id="pdfOptions"
                class="pdf-options"
                style="display:none;"
            >

                <div class="option-group">

                    <label for="pageSize">
                        Page Size
                    </label>

                    <select id="pageSize">

                        <option value="a4">
                            A4
                        </option>

                        <option value="letter">
                            Letter
                        </option>

                    </select>

                </div>


                <div class="option-group">

                    <label for="orientation">
                        Orientation
                    </label>

                    <select id="orientation">

                        <option value="portrait">
                            Portrait
                        </option>

                        <option value="landscape">
                            Landscape
                        </option>

                    </select>

                </div>

            </div>


            <div
                id="actionButtons"
                class="action-buttons"
                style="display:none;"
            >

                <button id="convertBtn">
                    Convert to PDF
                </button>

                <button
                    id="clearBtn"
                    class="clear-btn"
                >
                    Clear All
                </button>

            </div>


            <p id="status"></p>

        `;


        setupImageUploader();

        return;
    }


    /* =====================================================
       PDF TO JPG
       ===================================================== */

    if (tool === "pdf-jpg") {

        area.innerHTML = `

            <h2>
                PDF to JPG
            </h2>

            <p>
                Convert PDF pages into JPG images.
            </p>


            <div
                id="pdfDropZone"
                class="drop-zone"
            >

                <div class="upload-icon">
                    📄
                </div>

                <h3>
                    Drag & Drop your PDF here
                </h3>

                <p>
                    or
                </p>

                <label
                    for="pdfInput"
                    class="choose-btn"
                >
                    Choose PDF
                </label>

                <input
                    type="file"
                    id="pdfInput"
                    accept="application/pdf"
                    hidden
                >

                <small>
                    PDF files supported
                </small>

            </div>


            <div
                id="pdfPreview"
                class="preview-container"
            ></div>


            <button
                id="downloadAllBtn"
                class="choose-btn"
                style="display:none; margin-top:20px;"
            >
                Download All JPGs
            </button>


            <p id="pdfStatus"></p>

        `;


        setupPDFUploader();

        return;
    }


    /* =====================================================
       MERGE PDF
       ===================================================== */

    if (tool === "merge-pdf") {

        mergeFiles = [];
        mergeDraggedIndex = null;

        area.innerHTML = `

            <h2>
                Merge PDF
            </h2>

            <p>
                Combine multiple PDF files into one PDF.
            </p>


            <div
                id="mergeDropZone"
                class="drop-zone"
            >

                <div class="upload-icon">
                    📑
                </div>

                <h3>
                    Drag & Drop your PDF files here
                </h3>

                <p>
                    or
                </p>

                <label
                    for="mergePdfInput"
                    class="choose-btn"
                >
                    Choose PDF Files
                </label>

                <input
                    type="file"
                    id="mergePdfInput"
                    accept="application/pdf"
                    multiple
                    hidden
                >

                <small>
                    Select two or more PDF files
                </small>

            </div>


            <div
                id="mergePreview"
                class="preview-container"
            ></div>


            <div
                id="mergeActions"
                class="action-buttons"
                style="display:none;"
            >

                <button
                    id="mergeBtn"
                >
                    Merge PDFs
                </button>

                <button
                    id="mergeClearBtn"
                    class="clear-btn"
                >
                    Clear All
                </button>

            </div>


            <p id="mergeStatus"></p>

        `;


        setupMergePDF();

        return;
    }


    /* =====================================================
       COMPRESS PDF
       ===================================================== */

    if (tool === "compress-pdf") {

        area.innerHTML = `

            <h2>
                Compress PDF
            </h2>

            <p>
                Reduce the size of your PDF file.
            </p>


            <div
                id="compressDropZone"
                class="drop-zone"
            >

                <div class="upload-icon">
                    🗜️
                </div>

                <h3>
                    Drag & Drop your PDF here
                </h3>

                <p>
                    or
                </p>

                <label
                    for="compressPdfInput"
                    class="choose-btn"
                >
                    Choose PDF
                </label>

                <input
                    type="file"
                    id="compressPdfInput"
                    accept="application/pdf"
                    hidden
                >

                <small>
                    PDF files supported
                </small>

            </div>


            <div
                id="compressOptions"
                class="pdf-options"
                style="display:none;"
            >

                <div class="option-group">

                    <label for="compressionLevel">
                        Compression Level
                    </label>

                    <select id="compressionLevel">

                        <option value="high">
                            High Quality
                        </option>

                        <option
                            value="medium"
                            selected
                        >
                            Medium
                        </option>

                        <option value="low">
                            Strong Compression
                        </option>

                    </select>

                </div>

            </div>


            <p id="compressStatus"></p>


            <div
                id="compressInfo"
                class="preview-container"
            ></div>


            <div
                id="compressActions"
                class="action-buttons"
                style="display:none;"
            >

                <button
                    id="compressBtn"
                >
                    Compress PDF
                </button>

            </div>

        `;


        setupCompressPDF();

        return;
    }

}


/* =========================================================
   JPG TO PDF
   SETUP UPLOADER
   ========================================================= */

function setupImageUploader() {

    const input =
        document.getElementById("imageInput");

    const dropZone =
        document.getElementById("dropZone");

    const convertBtn =
        document.getElementById("convertBtn");

    const clearBtn =
        document.getElementById("clearBtn");


    if (!input || !dropZone) {
        return;
    }


    /* File selection */

    input.addEventListener(
        "change",
        function () {

            addImages(input.files);

            input.value = "";

        }
    );


    /* Drag over */

    dropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropZone.classList.add(
                "drag-active"
            );

        }
    );


    /* Drag leave */

    dropZone.addEventListener(
        "dragleave",
        function () {

            dropZone.classList.remove(
                "drag-active"
            );

        }
    );


    /* Drop */

    dropZone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropZone.classList.remove(
                "drag-active"
            );

            addImages(
                event.dataTransfer.files
            );

        }
    );


    /* Convert */

    convertBtn.addEventListener(
        "click",
        convertImagesToPDF
    );


    /* Clear */

    clearBtn.addEventListener(
        "click",
        clearImages
    );

}


/* =========================================================
   ADD IMAGES
   ========================================================= */

function addImages(files) {

    if (!files) {
        return;
    }


    for (const file of files) {

        if (
            file.type === "image/jpeg" ||
            file.type === "image/png"
        ) {

            selectedImages.push(file);

        }

    }


    renderPreviews();

}


/* =========================================================
   RENDER IMAGE PREVIEWS
   ========================================================= */

function renderPreviews() {

    const container =
        document.getElementById(
            "previewContainer"
        );

    const options =
        document.getElementById(
            "pdfOptions"
        );

    const buttons =
        document.getElementById(
            "actionButtons"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        selectedImages.length === 0
    ) {

        if (options) {
            options.style.display = "none";
        }

        if (buttons) {
            buttons.style.display = "none";
        }

        return;

    }


    if (options) {
        options.style.display = "flex";
    }

    if (buttons) {
        buttons.style.display = "flex";
    }


    selectedImages.forEach(
        function (file, index) {

            const card =
                document.createElement("div");


            card.className =
                "preview-card";


            card.draggable = true;


            card.dataset.index =
                index;


            card.innerHTML = `

                <div class="preview-number">
                    ${index + 1}
                </div>

                <div class="drag-hint">
                    ⋮⋮ Drag
                </div>

                <img
                    alt="Image preview"
                >

                <div class="preview-name">
                    ${escapeHTML(file.name)}
                </div>

                <button
                    class="remove-btn"
                    type="button"
                    title="Remove image"
                >
                    ✕
                </button>

            `;


            const img =
                card.querySelector("img");


            const removeBtn =
                card.querySelector(
                    ".remove-btn"
                );


            /* Image preview */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    img.src =
                        event.target.result;

                };


            reader.readAsDataURL(file);


            /* Remove */

            removeBtn.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    removeImage(index);

                }
            );


            /* Drag start */

            card.addEventListener(
                "dragstart",
                function (event) {

                    draggedIndex =
                        index;

                    card.classList.add(
                        "dragging"
                    );

                    event.dataTransfer.effectAllowed =
                        "move";

                    event.dataTransfer.setData(
                        "text/plain",
                        String(index)
                    );

                }
            );


            /* Drag over */

            card.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

                    if (
                        draggedIndex === null ||
                        draggedIndex === index
                    ) {
                        return;
                    }

                    card.classList.add(
                        "drag-over"
                    );

                }
            );


            /* Drag leave */

            card.addEventListener(
                "dragleave",
                function () {

                    card.classList.remove(
                        "drag-over"
                    );

                }
            );


            /* Drop */

            card.addEventListener(
                "drop",
                function (event) {

                    event.preventDefault();

                    card.classList.remove(
                        "drag-over"
                    );


                    if (
                        draggedIndex === null ||
                        draggedIndex === index
                    ) {

                        return;

                    }


                    moveImage(
                        draggedIndex,
                        index
                    );

                }
            );


            /* Drag end */

            card.addEventListener(
                "dragend",
                function () {

                    draggedIndex = null;

                    document
                        .querySelectorAll(
                            ".preview-card"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "dragging"
                                );

                                item.classList.remove(
                                    "drag-over"
                                );

                            }
                        );

                }
            );


            container.appendChild(card);

        }
    );

}


/* =========================================================
   MOVE IMAGE
   ========================================================= */

function moveImage(
    fromIndex,
    toIndex
) {

    if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= selectedImages.length ||
        toIndex >= selectedImages.length
    ) {

        return;

    }


    const movedImage =
        selectedImages[fromIndex];


    selectedImages.splice(
        fromIndex,
        1
    );


    let newIndex =
        toIndex;


    if (fromIndex < toIndex) {

        newIndex =
            toIndex - 1;

    }


    selectedImages.splice(
        newIndex,
        0,
        movedImage
    );


    draggedIndex = null;


    renderPreviews();

}


/* =========================================================
   REMOVE IMAGE
   ========================================================= */

function removeImage(index) {

    selectedImages.splice(
        index,
        1
    );


    renderPreviews();

}


/* =========================================================
   CLEAR IMAGES
   ========================================================= */

function clearImages() {

    selectedImages = [];

    draggedIndex = null;


    renderPreviews();


    const status =
        document.getElementById("status");


    if (status) {

        status.textContent = "";

    }

}


/* =========================================================
   CONVERT IMAGES TO PDF
   ========================================================= */

async function convertImagesToPDF() {

    const status =
        document.getElementById("status");


    if (!status) {
        return;
    }


    if (
        selectedImages.length === 0
    ) {

        status.textContent =
            "Please select at least one image.";

        return;

    }


    if (
        typeof window.jspdf === "undefined"
    ) {

        status.textContent =
            "❌ PDF library could not be loaded.";

        return;

    }


    status.textContent =
        "Creating your PDF...";


    const { jsPDF } =
        window.jspdf;


    const pageSize =
        document.getElementById(
            "pageSize"
        ).value;


    const orientation =
        document.getElementById(
            "orientation"
        ).value;


    const pdf =
        new jsPDF({

            orientation:
                orientation,

            unit:
                "mm",

            format:
                pageSize === "a4"
                    ? "a4"
                    : "letter"

        });


    try {

        for (
            let i = 0;
            i < selectedImages.length;
            i++
        ) {

            const file =
                selectedImages[i];


            status.textContent =
                `Processing ${i + 1} of ${selectedImages.length}...`;


            const imageURL =
                URL.createObjectURL(file);


            try {

                const image =
                    await loadImage(imageURL);


                const pageWidth =
                    pdf.internal.pageSize
                        .getWidth();


                const pageHeight =
                    pdf.internal.pageSize
                        .getHeight();


                const margin =
                    10;


                const availableWidth =
                    pageWidth -
                    margin * 2;


                const availableHeight =
                    pageHeight -
                    margin * 2;


                const imageRatio =
                    image.width /
                    image.height;


                let width =
                    availableWidth;


                let height =
                    width /
                    imageRatio;


                if (
                    height >
                    availableHeight
                ) {

                    height =
                        availableHeight;

                    width =
                        height *
                        imageRatio;

                }


                const x =
                    (
                        pageWidth -
                        width
                    ) / 2;


                const y =
                    (
                        pageHeight -
                        height
                    ) / 2;


                if (i > 0) {

                    pdf.addPage();

                }


                const imageType =
                    file.type === "image/png"
                        ? "PNG"
                        : "JPEG";


                pdf.addImage(
                    image,
                    imageType,
                    x,
                    y,
                    width,
                    height
                );


            } finally {

                URL.revokeObjectURL(
                    imageURL
                );

            }

        }


        const pdfBlob =
            pdf.output("blob");


        showPDFDownloadResult(
            status,
            pdfBlob
        );


    } catch (error) {

        console.error(
            "JPG to PDF error:",
            error
        );


        status.textContent =
            "❌ Unable to create PDF.";

    }

}


/* =========================================================
   SHOW PDF DOWNLOAD RESULT
   ========================================================= */

function showPDFDownloadResult(
    status,
    pdfBlob
) {

    const pdfURL =
        URL.createObjectURL(
            pdfBlob
        );


    status.innerHTML = `

        <div class="compression-result">

            <h3 class="result-title">
                ✅ PDF Created Successfully!
            </h3>


            <div class="option-group">

                <label for="downloadFileName">
                    PDF File Name
                </label>

                <input
                    type="text"
                    id="downloadFileName"
                    value="filetools-images"
                    placeholder="Enter PDF file name"
                >

            </div>


            <button
                id="downloadPDFBtn"
                class="choose-btn"
                style="margin-top:20px;"
            >
                Download PDF
            </button>

        </div>

    `;


    const downloadPDFBtn =
        document.getElementById(
            "downloadPDFBtn"
        );


    downloadPDFBtn.addEventListener(
        "click",
        function () {

            const nameInput =
                document.getElementById(
                    "downloadFileName"
                );


            let fileName =
                nameInput.value.trim();


            if (!fileName) {

                fileName =
                    "filetools-images";

            }


            if (
                !fileName
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                fileName += ".pdf";

            }


            downloadBlob(
                pdfBlob,
                fileName
            );

        }
    );

}


/* =========================================================
   PDF TO JPG
   SETUP
   ========================================================= */

function setupPDFUploader() {

    const input =
        document.getElementById("pdfInput");

    const dropZone =
        document.getElementById(
            "pdfDropZone"
        );

    const preview =
        document.getElementById("pdfPreview");

    const status =
        document.getElementById("pdfStatus");

    const downloadAllBtn =
        document.getElementById(
            "downloadAllBtn"
        );


    if (
        !input ||
        !dropZone ||
        !preview ||
        !status
    ) {

        return;

    }


    let jpgFiles = [];


    /* File selection */

    input.addEventListener(
        "change",
        async function () {

            if (!input.files[0]) {
                return;
            }


            await processPDFToJPG(
                input.files[0],
                preview,
                status,
                downloadAllBtn,
                function (files) {

                    jpgFiles = files;

                }
            );


            input.value = "";

        }
    );


    /* Drag over */

    dropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropZone.classList.add(
                "drag-active"
            );

        }
    );


    /* Drag leave */

    dropZone.addEventListener(
        "dragleave",
        function () {

            dropZone.classList.remove(
                "drag-active"
            );

        }
    );


    /* Drop */

    dropZone.addEventListener(
        "drop",
        async function (event) {

            event.preventDefault();

            dropZone.classList.remove(
                "drag-active"
            );


            const file =
                event.dataTransfer.files[0];


            if (!file) {
                return;
            }


            await processPDFToJPG(
                file,
                preview,
                status,
                downloadAllBtn,
                function (files) {

                    jpgFiles = files;

                }
            );

        }
    );


    /* Download all */

    downloadAllBtn.addEventListener(
        "click",
        function () {

            downloadJPGFiles(
                jpgFiles
            );

        }
    );

}


/* =========================================================
   PROCESS PDF TO JPG
   ========================================================= */

async function processPDFToJPG(
    file,
    preview,
    status,
    downloadAllBtn,
    saveFiles
) {

    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {

        status.textContent =
            "Please select a PDF file.";

        return;

    }


    if (
        typeof pdfjsLib === "undefined"
    ) {

        status.textContent =
            "❌ PDF.js could not be loaded.";

        return;

    }


    status.textContent =
        "Loading PDF...";


    preview.innerHTML = "";

    downloadAllBtn.style.display =
        "none";


    const fileURL =
        URL.createObjectURL(file);


    try {

        const pdf =
            await pdfjsLib.getDocument(
                fileURL
            ).promise;


        const jpgFiles = [];


        status.textContent =
            `PDF loaded — ${pdf.numPages} page(s)`;


        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            status.textContent =
                `Converting page ${pageNumber} of ${pdf.numPages}...`;


            const page =
                await pdf.getPage(
                    pageNumber
                );


            const viewport =
                page.getViewport({
                    scale: 1.5
                });


            const canvas =
                document.createElement(
                    "canvas"
                );


            const context =
                canvas.getContext(
                    "2d"
                );


            canvas.width =
                Math.ceil(
                    viewport.width
                );


            canvas.height =
                Math.ceil(
                    viewport.height
                );


            await page.render({

                canvasContext:
                    context,

                viewport:
                    viewport

            }).promise;


            const imageURL =
                canvas.toDataURL(
                    "image/jpeg",
                    0.9
                );


            jpgFiles.push({

                url:
                    imageURL,

                name:
                    `page-${pageNumber}.jpg`

            });


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "preview-card";


            card.innerHTML = `

                <div class="preview-number">
                    ${pageNumber}
                </div>


                <img
                    src="${imageURL}"
                    alt="Page ${pageNumber}"
                >


                <div class="preview-name">
                    Page ${pageNumber}
                </div>


                <a
                    href="${imageURL}"
                    download="page-${pageNumber}.jpg"
                    class="choose-btn"
                >
                    Download JPG
                </a>

            `;


            preview.appendChild(
                card
            );

        }


        saveFiles(
            jpgFiles
        );


        if (
            jpgFiles.length > 0
        ) {

            downloadAllBtn.style.display =
                "inline-block";

        }


        status.textContent =
            "✅ PDF converted successfully!";


    } catch (error) {

        console.error(
            "PDF to JPG error:",
            error
        );


        status.textContent =
            "❌ Unable to read this PDF.";

    } finally {

        URL.revokeObjectURL(
            fileURL
        );

    }

}


/* =========================================================
   DOWNLOAD ALL JPGS
   ========================================================= */

function downloadJPGFiles(
    jpgFiles
) {

    if (
        !jpgFiles ||
        jpgFiles.length === 0
    ) {

        return;

    }


    jpgFiles.forEach(
        function (file, index) {

            setTimeout(
                function () {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href =
                        file.url;


                    link.download =
                        file.name;


                    document.body.appendChild(
                        link
                    );


                    link.click();


                    document.body.removeChild(
                        link
                    );

                },
                index * 250
            );

        }
    );

}


/* =========================================================
   MERGE PDF
   SETUP
   ========================================================= */

function setupMergePDF() {

    const input =
        document.getElementById(
            "mergePdfInput"
        );

    const dropZone =
        document.getElementById(
            "mergeDropZone"
        );

    const mergeBtn =
        document.getElementById(
            "mergeBtn"
        );

    const clearBtn =
        document.getElementById(
            "mergeClearBtn"
        );


    if (
        !input ||
        !dropZone
    ) {

        return;

    }


    input.addEventListener(
        "change",
        function () {

            addMergeFiles(
                input.files
            );

            input.value = "";

        }
    );


    dropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropZone.classList.add(
                "drag-active"
            );

        }
    );


    dropZone.addEventListener(
        "dragleave",
        function () {

            dropZone.classList.remove(
                "drag-active"
            );

        }
    );


    dropZone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropZone.classList.remove(
                "drag-active"
            );


            addMergeFiles(
                event.dataTransfer.files
            );

        }
    );


    mergeBtn.addEventListener(
        "click",
        mergePDFs
    );


    clearBtn.addEventListener(
        "click",
        clearMergeFiles
    );

}


/* =========================================================
   ADD MERGE FILES
   ========================================================= */

function addMergeFiles(files) {

    if (!files) {
        return;
    }


    for (const file of files) {

        if (
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf")
        ) {

            mergeFiles.push(file);

        }

    }


    renderMergePreview();

}


/* =========================================================
   RENDER MERGE PREVIEW
   ========================================================= */

function renderMergePreview() {

    const preview =
        document.getElementById(
            "mergePreview"
        );

    const actions =
        document.getElementById(
            "mergeActions"
        );


    if (!preview) {
        return;
    }


    preview.innerHTML = "";


    if (
        mergeFiles.length === 0
    ) {

        if (actions) {
            actions.style.display =
                "none";
        }

        return;

    }


    if (actions) {
        actions.style.display =
            "flex";
    }


    mergeFiles.forEach(
        function (file, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "preview-card";


            card.draggable = true;


            card.innerHTML = `

                <div class="preview-number">
                    ${index + 1}
                </div>


                <div class="upload-icon">
                    📄
                </div>


                <div class="drag-hint">
                    ⋮⋮ Drag
                </div>


                <div class="preview-name">
                    ${escapeHTML(file.name)}
                </div>


                <button
                    class="remove-btn"
                    type="button"
                    title="Remove PDF"
                >
                    ✕
                </button>

            `;


            /* Remove */

            card
                .querySelector(
                    ".remove-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        mergeFiles.splice(
                            index,
                            1
                        );


                        renderMergePreview();

                    }
                );


            /* Drag start */

            card.addEventListener(
                "dragstart",
                function (event) {

                    mergeDraggedIndex =
                        index;


                    card.classList.add(
                        "dragging"
                    );


                    event.dataTransfer.effectAllowed =
                        "move";


                    event.dataTransfer.setData(
                        "text/plain",
                        String(index)
                    );

                }
            );


            /* Drag over */

            card.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();


                    if (
                        mergeDraggedIndex === null ||
                        mergeDraggedIndex === index
                    ) {

                        return;

                    }


                    card.classList.add(
                        "drag-over"
                    );

                }
            );


            /* Drag leave */

            card.addEventListener(
                "dragleave",
                function () {

                    card.classList.remove(
                        "drag-over"
                    );

                }
            );


            /* Drop */

            card.addEventListener(
                "drop",
                function (event) {

                    event.preventDefault();


                    card.classList.remove(
                        "drag-over"
                    );


                    if (
                        mergeDraggedIndex === null ||
                        mergeDraggedIndex === index
                    ) {

                        return;

                    }


                    const movedFile =
                        mergeFiles[
                            mergeDraggedIndex
                        ];


                    mergeFiles.splice(
                        mergeDraggedIndex,
                        1
                    );


                    let newIndex =
                        index;


                    if (
                        mergeDraggedIndex < index
                    ) {

                        newIndex =
                            index - 1;

                    }


                    mergeFiles.splice(
                        newIndex,
                        0,
                        movedFile
                    );


                    mergeDraggedIndex =
                        null;


                    renderMergePreview();

                }
            );


            /* Drag end */

            card.addEventListener(
                "dragend",
                function () {

                    mergeDraggedIndex =
                        null;


                    document
                        .querySelectorAll(
                            "#mergePreview .preview-card"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "dragging"
                                );

                                item.classList.remove(
                                    "drag-over"
                                );

                            }
                        );

                }
            );


            preview.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CLEAR MERGE FILES
   ========================================================= */

function clearMergeFiles() {

    mergeFiles = [];

    mergeDraggedIndex = null;


    const input =
        document.getElementById(
            "mergePdfInput"
        );


    if (input) {
        input.value = "";
    }


    renderMergePreview();


    const status =
        document.getElementById(
            "mergeStatus"
        );


    if (status) {

        status.textContent = "";

    }

}


/* =========================================================
   MERGE PDFS
   ========================================================= */

async function mergePDFs() {

    const status =
        document.getElementById(
            "mergeStatus"
        );


    if (!status) {
        return;
    }


    if (
        mergeFiles.length < 2
    ) {

        status.textContent =
            "Please select at least two PDF files.";

        return;

    }


    if (
        typeof PDFLib === "undefined"
    ) {

        status.textContent =
            "❌ PDF library could not be loaded.";

        return;

    }


    status.textContent =
        "Merging PDFs...";


    try {

        const mergedPDF =
            await PDFLib.PDFDocument.create();


        for (
            let i = 0;
            i < mergeFiles.length;
            i++
        ) {

            const file =
                mergeFiles[i];


            status.textContent =
                `Merging file ${i + 1} of ${mergeFiles.length}...`;


            const arrayBuffer =
                await file.arrayBuffer();


            const sourcePDF =
                await PDFLib.PDFDocument.load(
                    arrayBuffer
                );


            const pageIndices =
                sourcePDF
                    .getPageIndices();


            const copiedPages =
                await mergedPDF.copyPages(
                    sourcePDF,
                    pageIndices
                );


            copiedPages.forEach(
                function (page) {

                    mergedPDF.addPage(
                        page
                    );

                }
            );

        }


        const mergedBytes =
            await mergedPDF.save();


        const blob =
            new Blob(
                [mergedBytes],
                {
                    type:
                        "application/pdf"
                }
            );


        showMergeDownloadResult(
            status,
            blob
        );


    } catch (error) {

        console.error(
            "Merge PDF error:",
            error
        );


        status.textContent =
            "❌ Unable to merge these PDF files.";

    }

}


/* =========================================================
   MERGE DOWNLOAD RESULT
   ========================================================= */

function showMergeDownloadResult(
    status,
    blob
) {

    const url =
        URL.createObjectURL(
            blob
        );


    status.innerHTML = `

        <div class="compression-result">

            <h3 class="result-title">
                ✅ PDFs Merged Successfully!
            </h3>


            <div class="option-group">

                <label for="mergeFileName">
                    PDF File Name
                </label>

                <input
                    type="text"
                    id="mergeFileName"
                    value="merged-file"
                    placeholder="Enter PDF file name"
                >

            </div>


            <button
                id="downloadMergedBtn"
                class="choose-btn"
                style="margin-top:20px;"
            >
                Download Merged PDF
            </button>

        </div>

    `;


    const button =
        document.getElementById(
            "downloadMergedBtn"
        );


    button.addEventListener(
        "click",
        function () {

            const input =
                document.getElementById(
                    "mergeFileName"
                );


            let fileName =
                input.value.trim();


            if (!fileName) {

                fileName =
                    "merged-file";

            }


            if (
                !fileName
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                fileName += ".pdf";

            }


            downloadBlob(
                blob,
                fileName
            );

        }
    );

}


/* =========================================================
   COMPRESS PDF
   SETUP
   ========================================================= */

function setupCompressPDF() {

    const input =
        document.getElementById(
            "compressPdfInput"
        );

    const dropZone =
        document.getElementById(
            "compressDropZone"
        );

    const info =
        document.getElementById(
            "compressInfo"
        );

    const status =
        document.getElementById(
            "compressStatus"
        );

    const actions =
        document.getElementById(
            "compressActions"
        );

    const compressBtn =
        document.getElementById(
            "compressBtn"
        );


    if (
        !input ||
        !dropZone
    ) {

        return;

    }


    function handleFile(file) {

        if (!file) {
            return;
        }


        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {

            status.textContent =
                "Please select a PDF file.";

            return;

        }


        const sizeMB =
            (
                file.size /
                (1024 * 1024)
            ).toFixed(2);


        info.innerHTML = `

            <div class="preview-card">

                <div class="upload-icon">
                    📄
                </div>

                <div class="preview-name">
                    ${escapeHTML(file.name)}
                </div>

                <p>
                    Original size:
                    <strong>
                        ${sizeMB} MB
                    </strong>
                </p>

            </div>

        `;


        const options =
            document.getElementById(
                "compressOptions"
            );


        if (options) {

            options.style.display =
                "flex";

        }


        if (actions) {

            actions.style.display =
                "flex";

        }


        status.textContent =
            "PDF ready to compress.";


        compressBtn.onclick =
            function () {

                compressPDF(file);

            };

    }


    /* File selection */

    input.addEventListener(
        "change",
        function () {

            handleFile(
                input.files[0]
            );

            input.value = "";

        }
    );


    /* Drag over */

    dropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropZone.classList.add(
                "drag-active"
            );

        }
    );


    /* Drag leave */

    dropZone.addEventListener(
        "dragleave",
        function () {

            dropZone.classList.remove(
                "drag-active"
            );

        }
    );


    /* Drop */

    dropZone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropZone.classList.remove(
                "drag-active"
            );


            handleFile(
                event.dataTransfer.files[0]
            );

        }
    );

}


/* =========================================================
   COMPRESS PDF
   ========================================================= */

async function compressPDF(file) {

    const status =
        document.getElementById(
            "compressStatus"
        );


    if (!file) {

        status.textContent =
            "Please select a PDF first.";

        return;

    }


    if (
        typeof pdfjsLib === "undefined" ||
        typeof window.jspdf === "undefined"
    ) {

        status.textContent =
            "❌ Required PDF libraries could not be loaded.";

        return;

    }


    status.textContent =
        "Compressing PDF...";


    try {

        const fileURL =
            URL.createObjectURL(file);


        try {

            const pdf =
                await pdfjsLib.getDocument(
                    fileURL
                ).promise;


            const { jsPDF } =
                window.jspdf;


            const compressionLevel =
                document.getElementById(
                    "compressionLevel"
                ).value;


            let imageQuality;
            let renderScale;


            if (
                compressionLevel === "high"
            ) {

                imageQuality =
                    0.85;

                renderScale =
                    1.6;

            } else if (
                compressionLevel === "medium"
            ) {

                imageQuality =
                    0.65;

                renderScale =
                    1.3;

            } else {

                imageQuality =
                    0.45;

                renderScale =
                    1.0;

            }


            const firstPage =
                await pdf.getPage(1);


            const firstViewport =
                firstPage.getViewport({
                    scale: renderScale
                });


            const outputPDF =
                new jsPDF({

                    orientation:
                        firstViewport.width >
                        firstViewport.height
                            ? "landscape"
                            : "portrait",

                    unit:
                        "mm",

                    format:
                        "a4",

                    compress:
                        true

                });


            for (
                let pageNumber = 1;
                pageNumber <= pdf.numPages;
                pageNumber++
            ) {

                status.textContent =
                    `Compressing page ${pageNumber} of ${pdf.numPages}...`;


                const page =
                    await pdf.getPage(
                        pageNumber
                    );


                const viewport =
                    page.getViewport({
                        scale:
                            renderScale
                    });


                const canvas =
                    document.createElement(
                        "canvas"
                    );


                const context =
                    canvas.getContext(
                        "2d",
                        {
                            alpha: false
                        }
                    );


                canvas.width =
                    Math.ceil(
                        viewport.width
                    );


                canvas.height =
                    Math.ceil(
                        viewport.height
                    );


                await page.render({

                    canvasContext:
                        context,

                    viewport:
                        viewport,

                    background:
                        "white"

                }).promise;


                const imageData =
                    canvas.toDataURL(
                        "image/jpeg",
                        imageQuality
                    );


                if (
                    pageNumber > 1
                ) {

                    outputPDF.addPage();

                }


                const pageWidth =
                    outputPDF
                        .internal
                        .pageSize
                        .getWidth();


                const pageHeight =
                    outputPDF
                        .internal
                        .pageSize
                        .getHeight();


                const margin =
                    10;


                const availableWidth =
                    pageWidth -
                    margin * 2;


                const availableHeight =
                    pageHeight -
                    margin * 2;


                const imageRatio =
                    canvas.width /
                    canvas.height;


                let width =
                    availableWidth;


                let height =
                    width /
                    imageRatio;


                if (
                    height >
                    availableHeight
                ) {

                    height =
                        availableHeight;


                    width =
                        height *
                        imageRatio;

                }


                const x =
                    (
                        pageWidth -
                        width
                    ) / 2;


                const y =
                    (
                        pageHeight -
                        height
                    ) / 2;


                outputPDF.addImage(

                    imageData,

                    "JPEG",

                    x,
                    y,

                    width,
                    height,

                    undefined,

                    "FAST"

                );

            }


            const pdfBlob =
                outputPDF.output(
                    "blob"
                );


            const originalSize =
                (
                    file.size /
                    (1024 * 1024)
                ).toFixed(2);


            const compressedSize =
                (
                    pdfBlob.size /
                    (1024 * 1024)
                ).toFixed(2);


            const originalBytes =
                file.size;


            const compressedBytes =
                pdfBlob.size;


            const savedPercent =
                originalBytes > 0
                    ? (
                        (
                            (
                                originalBytes -
                                compressedBytes
                            ) /
                            originalBytes
                        ) *
                        100
                    ).toFixed(1)
                    : 0;


            showCompressionResult(

                status,

                pdfBlob,

                originalSize,

                compressedSize,

                savedPercent

            );

        } finally {

            URL.revokeObjectURL(
                fileURL
            );

        }


    } catch (error) {

        console.error(
            "Compress PDF error:",
            error
        );


        status.textContent =
            "❌ Unable to compress this PDF.";

    }

}


/* =========================================================
   SHOW COMPRESSION RESULT
   ========================================================= */

function showCompressionResult(
    status,
    pdfBlob,
    originalSize,
    compressedSize,
    savedPercent
) {

    status.innerHTML = `

        <div class="compression-result">

            <h3 class="result-title">
                ✅ Compression Complete!
            </h3>


            <div class="compression-stats">

                <div>
                    <strong>
                        Original
                    </strong>

                    <span>
                        ${originalSize} MB
                    </span>
                </div>


                <div>
                    <strong>
                        Compressed
                    </strong>

                    <span>
                        ${compressedSize} MB
                    </span>
                </div>


                <div>
                    <strong>
                        Saved
                    </strong>

                    <span
                        style="color:#16a34a;"
                    >
                        ${savedPercent}%
                    </span>
                </div>

            </div>


            <div class="option-group">

                <label for="compressedFileName">
                    PDF File Name
                </label>

                <input
                    type="text"
                    id="compressedFileName"
                    value="compressed-file"
                    placeholder="Enter PDF file name"
                >

            </div>


            <button
                id="downloadCompressedBtn"
                class="choose-btn"
                style="margin-top:20px;"
            >
                Download Compressed PDF
            </button>

        </div>

    `;


    const button =
        document.getElementById(
            "downloadCompressedBtn"
        );


    button.addEventListener(
        "click",
        function () {

            const input =
                document.getElementById(
                    "compressedFileName"
                );


            let fileName =
                input.value.trim();


            if (!fileName) {

                fileName =
                    "compressed-file";

            }


            if (
                !fileName
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                fileName += ".pdf";

            }


            downloadBlob(
                pdfBlob,
                fileName
            );

        }
    );

}


/* =========================================================
   LOAD IMAGE
   ========================================================= */

function loadImage(url) {

    return new Promise(
        function (resolve, reject) {

            const image =
                new Image();


            image.onload =
                function () {

                    resolve(image);

                };


            image.onerror =
                function () {

                    reject(
                        new Error(
                            "Unable to load image."
                        )
                    );

                };


            image.src =
                url;

        }
    );

}


/* =========================================================
   DOWNLOAD BLOB
   ========================================================= */

function downloadBlob(
    blob,
    fileName
) {

    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        fileName;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );

}


/* =========================================================
   SECURITY HELPER
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}

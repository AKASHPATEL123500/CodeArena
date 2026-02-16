const FileTest = () => {
    return (
        <div style={ { padding: 40, background: "#111", minHeight: "100vh" } }>
            <h2 style={ { color: "white" } }>File Test</h2>

            {/* Test 1 - Simple input */ }
            <p style={ { color: "#aaa" } }>Test 1 - Direct input:</p>
            <input
                type="file"
                accept="image/*"
                onChange={ ( e ) => alert( "Test1: " + ( e.target.files[ 0 ]?.name || "NO FILE" ) ) }
                style={ { color: "white", marginBottom: 20, display: "block" } }
            />

            {/* Test 2 - Label + hidden input */ }
            <p style={ { color: "#aaa" } }>Test 2 - Label + hidden:</p>
            <label htmlFor="t2" style={ {
                display: "inline-block", padding: "10px 20px",
                background: "#4ade80", color: "black",
                borderRadius: 8, marginBottom: 20, cursor: "pointer"
            } }>
                Pick Image
            </label>
            <input
                id="t2"
                type="file"
                accept="image/*"
                onChange={ ( e ) => alert( "Test2: " + ( e.target.files[ 0 ]?.name || "NO FILE" ) ) }
                style={ { display: "none" } }
            />
        </div>
    )
}

export default FileTest
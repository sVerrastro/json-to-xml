// Textarea elements
var editJson = document.getElementById('edit_json');
var editXml = document.getElementById('edit_xml');

// Button elements
var buttonConvert = document.getElementById('button_convert');
var buttonClear = document.getElementById('button_clear');

// Event listener convert
buttonConvert.addEventListener('click', function() {
    let jsonText = editJson.value;
    let heading = '<?xml version="1.0" encoding="UTF-8"?>\n';
    
    try {
        let json = JSON.parse(jsonText);
        editXml.value = heading + jsonToXml(json);
    } catch (error) {
        editXml.value = "Invalid JSON format.";
    }
});

// Event listener clear
buttonClear.addEventListener('click', function() {
    editJson.value = "";
    editXml.value = "";
});

function jsonToXml(json, tagName = "root", depth = 0) {
    const indent = '  '.repeat(depth);
    let xml = `${indent}<${tagName}>`;

    for (let key in json) {
        const value = json[key];
        console.log(key);

        if (typeof value !== "object" || value === null) {
            // dato primitivo
            xml += `\n${indent}     <${key}>${value}</${key}>`;
        } else if (Array.isArray(value)) {
            // array
            value.forEach(item => {
                if (typeof item === "object") {
                    // ... di oggetti
                    xml += `\n${jsonToXml(item, key, depth + 1)}`;
                } else {
                    // ... di dati primitivi
                    xml += `\n${indent}     <${key}>${item}</${key}>`;
                }
            });
        } else {
            // oggetto
            xml += `\n${jsonToXml(value, key, depth + 1)}`;
        }
    }

    xml += `\n${indent}</${tagName}>`;
    return xml;
}
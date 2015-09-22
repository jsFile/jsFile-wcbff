/**
 *
 * @param options
 */
export default function (options = {}) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        const {index = 0, length = 0} = options;

        reader.onload = (e) => {
            resolve(new Uint8Array(e.target.result));
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(this.blob.slice(index, index + length));
    }.bind(this));
}
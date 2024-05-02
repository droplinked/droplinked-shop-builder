interface ModalInterface {
    waiting(message: String): any;
    success(message: String): any;
    error(message: String): any;
    close(): any;
}

class defaultModal implements ModalInterface {

    waiting(message: String) {
        console.log(`Waiting: ${message}`);
    }

    success(message: String) {
        console.log(`Success: ${message}`);
    }

    error(message: String) {
        console.log(`Error: ${message}`);
    }

    close() {
        console.log("Close");
    }
}

export { ModalInterface, defaultModal }
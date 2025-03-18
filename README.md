# Delete Offer Images

This project deletes images related to offers using [Appwrite](https://appwrite.io/). The function listens for delete events on offer documents and removes the corresponding images from Appwrite Storage.

## Usage

Ensure you've configured the following environment variables:

- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_BUCKET_ID`

Then, run the project using node:

```sh
node src/main.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
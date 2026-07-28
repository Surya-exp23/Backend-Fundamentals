

## Learning how bcrypt actually works

```
this.password=bcrypt.hash(this.password, 10)
```

- Bcrypt doesn’t just hash the password directly — it adds a random salt and then runs the hashing algorithm multiple times.

- The number 10 tells bcrypt how many times to run the key expansion and hashing process.

- Higher numbers = more computation = stronger security, but also slower performance.


## how actually multer works

- Multer sits on top of busboy, a low-level streaming parser for multipart bodies. Here's the real sequence:

- The client sends a request with Content-Type: multipart/form-data; boundary=.... - The body is a stream of parts, each separated by that boundary — some parts are plain fields, others are files (with their own Content-Disposition and Content-Type headers). 

- Multer never buffers the whole request into memory as a blob. It pipes the incoming request stream into busboy, which emits events (field, file) as it parses the boundary-delimited chunks. 

- For each file event, multer immediately calls your destination callback, then your filename callback, then opens a write stream to path.join(destination, filename) and pipes the file's data stream directly into it. This is why disk storage handles large files well — nothing large ever sits fully in RAM.
 
- Once the stream ends, multer attaches the result to req.file (single) or req.files (array/fields), with properties like fieldname, originalname, encoding, mimetype, destination, filename, path, size. 

- Non-file fields get parsed as strings and land on req.body, same as any other Express body parser.  

- Only after everything finishes does multer call next(), handing control to your route handler.  
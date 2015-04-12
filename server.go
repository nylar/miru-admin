package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	log.Println("Serving on port 8037")
	http.ListenAndServe(":8037", nil)
}

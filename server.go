package main

import "net/http"

func init() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)
}

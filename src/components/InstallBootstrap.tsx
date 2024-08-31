'use client'

import React, { useEffect } from 'react'
import "@/bootstrapSetup/css/bootstrap.css"
import "@/bootstrapSetup/css/animate.css"
import "@/bootstrapSetup/css/icon-fonts.css"
import "@/bootstrapSetup/css/main.css"
import "@/bootstrapSetup/css/responsive.css"

export default function InstallBootstrap() {

    useEffect(()=>{
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap.bundle.js")
    },[])
  return (
    <>
    </>
  )
}

import React, { useState, useEffect } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js';

import "./Reader.css"

import { Box, Button, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";

import { useUser } from "../../../../../hooks/userUser";
import { useLibary } from "../../../../../hooks/useLibary";
import { useNavigate } from "react-router-dom";

const Reader: React.FC = () => {
  const { user, setUser } = useUser();
  const { bookSelected } = useLibary();

  const reading = user?.keepReading.reading.find(
    (book) => book.id === bookSelected?.id
  );

  const pag = reading ? reading.pag : 1;

  const [pageNum, setPageNum] = useState<number>(pag);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [tamanhoPdf, setTamanhoPdf] = useState<string>("pequeno");

  const path = "/src/assets/pdf/";

  useEffect(() => {
    const others = user?.keepReading.reading.filter(
      (livro) => livro.id !== bookSelected?.id
    );

    setUser({
      ...(user as IUser),
      keepReading: {
        books: user?.keepReading.books as IDataBook[],
        reading: [
          ...(others as IReading[]),
          { id: bookSelected?.id as string, pag: pageNum },
        ],
      },
    });
  }, [pageNum]);

  useEffect(() => {
    const url = path + bookSelected?.pdfName;
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    pdfjsLib
      .getDocument(url)
      .promise.then((pdfDoc_: pdfjsLib.PDFDocumentProxy | null) => {
        setPdfDoc(pdfDoc_);
      });
  }, []);

  useEffect(() => {
    const renderizaPagina = (pageNumber: number) => {
      if (pdfDoc) {
        let pageRendering: boolean = false;
        let pageNumPending: number | null = null;

        if (pageRendering) {
          pageNumPending = pageNumber;
        } else {
          pageRendering = true;

          pdfDoc.getPage(pageNumber).then((page) => {
            const scale: number = 1.5;
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.getElementById(
              "the-canvas"
            ) as HTMLCanvasElement;
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            const renderTask = page.render(renderContext);

            renderTask.promise.then(() => {
              pageRendering = false;
              if (pageNumPending !== null) {
                renderizaPagina(pageNumPending);
              }
            });
          });
        }

        document.getElementById("page_num")!.textContent =
          pageNumber.toString();
        document.getElementById("page_count")!.textContent =
          pdfDoc.numPages.toString();
        document.getElementById("porcentagem")!.textContent = (
          (pageNumber * 100) /
          pdfDoc.numPages
        ).toFixed(2);
      }
    };

    renderizaPagina(pageNum);
  }, [pageNum, pdfDoc]);

  const onPrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const onNextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
      setPageNum(pageNum + 1);
    }
  };

  const handleGoBackStart = () => {
    setPageNum(1);
  };

  const mudarTamanho = () => {
    const tamanhos = ["pequeno", "medio", "grande", "super-grande"];
    const indiceAtual = tamanhos.indexOf(tamanhoPdf);
    const novoIndice = (indiceAtual + 1) % tamanhos.length;
    setTamanhoPdf(tamanhos[novoIndice]);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/prereading`);
  };

  return (
    <>
      <Box maxHeight={'100%'} overflow={'auto'}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <canvas id="the-canvas" className={tamanhoPdf}></canvas>
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          textAlign: "center",
          padding: 4,
          bgcolor:'Background'
        }}
      >
        <Divider sx={{bgcolor:"primary.main"}}/>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoBackStart}
          size="small"
          sx={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
          }}
        >
          Voltar a página inicial
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGoBack}
          size="small"
          sx={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
          }}
        >
          Sair da Leitura
        </Button>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={{xs:10, sm:16}}
        >
          <Tooltip arrow title="Anterior" placement="left">
            <IconButton onClick={onPrevPage}>
              <ArrowCircleLeft fontSize="large"></ArrowCircleLeft>
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Zoom" placement="top">
            <IconButton onClick={mudarTamanho}>
              {tamanhoPdf === "super-grande" ? (
                <ZoomOut fontSize="large"></ZoomOut>
              ) : (
                <ZoomIn fontSize="large"></ZoomIn>
              )}
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Próximo" placement="right">
            <IconButton onClick={onNextPage}>
              <ArrowCircleRight fontSize="large"></ArrowCircleRight>
            </IconButton>
          </Tooltip>
        </Stack>

        <Box>
          <span>
            Página: <span id="page_num"></span> / <span id="page_count"></span>(
            <span id="porcentagem"></span>%)
          </span>
        </Box>
      </Box>
    </>
  );
};

export default Reader;

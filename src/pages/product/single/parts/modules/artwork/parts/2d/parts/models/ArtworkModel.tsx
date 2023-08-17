import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { fabric } from 'fabric';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Shirt from './parts/shirt/Shirt';
import { productContext } from 'pages/product/single/context';
import artwork2dContext from '../../context';

function ArtworkModel() {
    const canvasRef = useRef(null);
    const { state: { artwork } } = useContext(productContext)
    const { position: { area_height, area_width, height, left, top }, setStates } = useContext(artwork2dContext)

    const loadImage = useCallback((Images: string, canvas: any) => {
        fabric.Image.fromURL(
            Images,
            function (img) {
                const desiredHeight = height;
                const aspectRatio = img.width / img.height;
                const desiredWidth = desiredHeight * aspectRatio;

                img.set({
                    scaleX: desiredWidth / img.width,
                    scaleY: desiredHeight / img.height,
                    top,
                    left,
                    lockRotation: true,
                });

                img.on('moving', () => {
                    const updatedTop = img.top;
                    const updatedLeft = img.left;
                    setStates(prev => ({ ...prev, position: { ...prev.position, top: updatedTop, left: updatedLeft } }));
                });

                img.on('scaling', (e) => {
                    const scaleX = img.scaleX
                    const scaleY = img.scaleX

                    if (e.transform.action !== "scale") {
                        img.set({
                            scaleX: scaleX,
                            scaleY: scaleY,
                        });
                    }
                    setStates(prev => ({ ...prev, position: { ...prev.position, width: img.getScaledWidth(), height: img.getScaledHeight() } }));
                })

                canvas.add(img);
                canvas.renderAll();
            },
            { crossOrigin: 'anonymous' }
        );
    }, [height, top, left])

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: area_width,
            height: area_height,
        });

        loadImage(artwork, canvas)

        return () => {
            canvas.dispose();
        };
    }, [artwork, area_width, area_height])

    return (
        <Box position="relative">
            <Shirt>
                <Box position="absolute" top="50%" left="50%" width={area_width + 'px'} height={area_height + 'px'} border="1px dashed #5fffda" transform="translate(-50%,-50%)">
                    <canvas ref={canvasRef} />
                </Box>
            </Shirt>
        </Box>
    )
}

export default ArtworkModel
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import img1 from "./images/1.png"
import img2 from "./images/2.png"
import img3 from "./images/3.png"

interface ObjectData {
    id: string;
    x: number;
    y: number;
    image: HTMLImageElement | undefined;
}

const App: React.FC = () => {
    const [objects, setObjects] = useState<ObjectData[]>([]);

    const [droppedImage, setDroppedImage] = useState<HTMLImageElement | undefined>(undefined);

    useEffect(() => {

    }, []);

    const handleDragStart = () => {
        // Нет необходимости в изменениях для начала перетаскивания
    };

    const handleDragEnd = (e: any) => {
        const stageWidth = window.innerWidth / 2;
        const stageHeight = window.innerHeight;

        const updatedObjects = objects.map((obj) => {
            if (obj.id === e.target.attrs.id) {
                const maxX = stageWidth - e.target.width() / 2;
                const maxY = stageHeight - e.target.height() / 2;
                const x = Math.min(maxX, Math.max(e.target.width() / 2, e.target.x()));
                const y = Math.min(maxY, Math.max(e.target.height() / 2, e.target.y()));
                return { ...obj, x, y };
            }
            return obj;
        });

        setObjects(updatedObjects);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const imageSrc = e.dataTransfer.getData('imageSrc');
        const img = new window.Image();
        img.src = imageSrc;

        const newObject: ObjectData = {
            id: `obj-${objects.length + 1}`,
            x: 10,
            y: 10,
            image: img,
        };

        setObjects((prevObjects) => [...prevObjects, newObject]);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };


    return (
        <div>
            <h3>Планировка</h3>
            <img
                draggable={true}
                src={img1}
                style={{ width: '100px', height: '100px', margin: '10px', cursor: 'move' }}
                onDragStart={(e) => {
                    e.dataTransfer.setData('imageSrc', img1);
                }}
            />
            <img
                src={img2}
                style={{ width: '100px', height: '100px', margin: '10px', cursor: 'move' }}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('imageSrc', img2);
                }}
            />
            <img
                src={img3}
                alt="Rhino"
                style={{ width: '100px', height: '100px', margin: '10px', cursor: 'move' }}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('imageSrc', img3);
                }}
            />
            <div
                style={{
                    float: 'left',
                    width: '50%',
                    height: '100%',
                    padding: '10px',
                    border: '1px solid gray',
                    background: "black"
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <Stage width={window.innerWidth / 2} height={window.innerHeight}>
                    <Layer>
                        {objects.map((obj) => (
                            <Image
                                key={obj.id}
                                id={obj.id}
                                x={20}
                                y={20}
                                image={obj.image}
                                width={100}
                                height={100}
                                draggable
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default App;

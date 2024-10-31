import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import p5 from 'p5';

const ShirtGallery = () => {
  const [imageURL, setImageURL] = useState('');
  const [shirt, setShirt] = useState(null);
  const colors = ['', '', '', '', '', '', '', '', ''];
  const paths1 = [
    "M 200 400 C 200 310 190 280 260 200 C 330 140 310 210 400 200 ",
    "M 200 400 C 200 310 190 280 290 310 C 390 340 310 190 400 200 ",
    "M 200 400 C 200 330 150 330 230 290 C 370 220 210 80 130 160 Q 30 260 160 310 C 290 390 210 190 400 200 "
  ];
  const paths2 = [
    "M 0 200 C 180 190 190 280 230 230 C 260 180 190 150 200 0 ",
    "M 0 200 C 90 210 60 160 160 200 C 310 250 210 100 200 0 ",
    "M 0 200 C 90 210 60 160 30 120 C 0 60 210 100 200 0 ",
    "M 0 200 C 90 210 20 310 100 280 C 310 250 210 100 130 160 Q 40 240 160 310 C 290 390 380 230 200 0 "
  ];

  useEffect(() => {
    drawShirt();
    setTimeout(() => {
      reset();
    }, 5000);

    document.addEventListener('click', () => {
      document.body.classList.add('loading');
      drawShirt();
      setTimeout(() => {
        reset();
        document.body.classList.remove('loading');
      }, 1000);
    });
    
    return () => {
      document.removeEventListener('click', () => {});
    };
  }, []);

  const drawShirt = () => {
    document.body.style.setProperty('--contrast', Math.floor(Math.random() * 10));
    const pattern = document.getElementById('pattern');
    pattern.style.setProperty('--cellcount', Math.floor(Math.random() * 3) + 7);
    pattern.style.setProperty('--stroke', Math.floor(Math.random() * 25) + 5);
    
    for (let i = 0; i < colors.length; i++) {
      colors[i] = "rgba(" +
        Math.floor(Math.random() * 255) + "," +
        Math.floor(Math.random() * 255) + "," +
        Math.floor(Math.random() * 255) + "," +
        1 / (Math.floor(Math.random() * 5) + 1) + ")";
    }

    document.querySelectorAll('.cell').forEach((cell) => {
      for (let i = 0; i < colors.length; i++) {
        cell.style.setProperty('--color' + i, colors[i]);
      }
      cell.style.setProperty('--rotate', Math.floor(Math.random() * 360) + 1);
      cell.style.setProperty('--rotate2', Math.floor(Math.random() * 360) + 1 + 'deg');
      cell.style.setProperty('--scale', Math.floor(Math.random() * 5) + 1);
      cell.style.setProperty('--distance', Math.floor(Math.random() * 25) + 10);
    });

    document.querySelectorAll('.cellsvg1').forEach((svg) => {
      svg.setAttribute('d', paths1[Math.floor(Math.random() * 3)]);
    });

    document.querySelectorAll('.cellsvg2').forEach((svg) => {
      svg.setAttribute('d', paths2[Math.floor(Math.random() * 4)]);
    });

    html2canvas(pattern, { useCORS: true }).then(function(canvas) {
      setImageURL(canvas.toDataURL('image/jpg'));
    });
  };

  const reset = () => {
    new p5((p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.img = p.loadImage(imageURL);
      };

      p.draw = () => {
        p.background(255, 255, 255, 0);
        p.ambientLight(180);
        p.directionalLight(255, 255, 255, p.width / 2, p.height / 2, 0);
        p.rotateY(p.frameCount / 40);
        p.noStroke();
        p.rotateX(15.6);
        p.scale(2, 2, 2);
        if (shirt) {
          p.model(shirt);
          p.texture(p.img);
          p.textureMode(p.IMAGE);
          p.textureWrap(p.CLAMP);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    });
  };

  return (
    <div>
      <h1>DAN <br />FLASHES<span>Complicated Shirts <br />for Complicated Gentlemen</span></h1>
      <span>fetching new shirts</span>
      <strong>click for new shirt</strong>
      <div id="pattern">
        {Array.from({ length: 64 }).map((_, index) => (
          <div className="cell" key={index}>
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path className="cellsvg1" stroke="#FF0066" fill="transparent" />
              <path className="cellsvg2" stroke="#FF0066" fill="transparent" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShirtGallery;

import { readFileSync } from 'fs';
import { join } from 'path';
import { constructMetadata } from '@/utils';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const sourceSans3 = readFileSync(
  join(process.cwd(), 'public', 'assets', 'fonts', 'SourceSans3-VariableFont_wght.ttf'),
);
const sourceSans3Italic = readFileSync(
  join(process.cwd(), 'public', 'assets', 'fonts', 'SourceSans3-Italic-VariableFont_wght.ttf'),
);
const palatino = readFileSync(join(process.cwd(), 'public', 'assets', 'fonts', 'palatino.ttf'));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || String(constructMetadata({}).title);
  const description = searchParams.get('description') || String(constructMetadata({}).description);

  const logoSvg = readFileSync(join(process.cwd(), 'public', 'assets', 'svgs', 'logo.svg'), 'utf8');

  return new ImageResponse(
    <div
      tw="flex flex-col justify-between w-full h-full p-20 bg-[#234c8b]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #458eff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #458eff 2%, transparent 0%)',
        backgroundSize: '100px 100px',
        fontFamily: '"Source Sans 3", sans-serif',
      }}
    >
      <div tw="flex flex-col text-white">
        <h1
          tw="text-7xl font-bold leading-tight tracking-tight mb-4"
          style={{ fontFamily: 'Palatino, serif' }}
        >
          {title}
        </h1>
        <p tw="text-3xl max-w-4xl font-normal">{description}</p>
      </div>
      <div tw="flex justify-between items-end w-full">
        <div tw="flex items-center">
          <div
            style={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />
          <span tw="ml-6 text-4xl font-bold text-white" style={{ fontFamily: 'Palatino, serif' }}>
            Your Site Name
          </span>
        </div>
        <span tw="text-2xl font-medium text-[#8bb9ff]" style={{ fontStyle: 'italic' }}>
          yourdomain.com
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Source Sans 3',
          data: sourceSans3,
          weight: 200,
          style: 'normal',
        },
        {
          name: 'Source Sans 3',
          data: sourceSans3,
          weight: 900,
          style: 'normal',
        },
        {
          name: 'Source Sans 3',
          data: sourceSans3Italic,
          weight: 200,
          style: 'italic',
        },
        {
          name: 'Source Sans 3',
          data: sourceSans3Italic,
          weight: 900,
          style: 'italic',
        },
        {
          name: 'Palatino',
          data: palatino,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}

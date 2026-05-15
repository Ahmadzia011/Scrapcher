import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

async function main() {
  const embeding_model = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY
  });

  const texts = [
    '  )\n}\n```',
    "Let's make the `Board` component fully controlled by the props it receives. To do this, we'll modify the `Board` component to accept three props: `xIsNext`, `squares`, and a new `onPlay` function that the `Board` component can call with the updated squares array when a player makes a move.",
    '```\nfunction Board({ xIsNext, squares, onPlay }) {\n  const winner = calculateWinner(squares)\n  const turns = calculateTurns(squares)\n  const player = xIsNext ? \'X\' : \'O\'\n  const status = calculateStatus(winner, turns, player)\n\n  function handleClick(i) {\n    if (squares[i] || winner) return\n    const nextSquares = squares.slice()\n    nextSquares[i] = player\n    onPlay(nextSquares)\n  }',
    'return (\n    <>\n      <div style={{ marginBottom: \'0.5rem\' }}>{status}</div>\n      <div\n        style={{\n          display: \'grid\',\n          gridTemplateColumns: \'repeat(3, 1fr)\',\n          gridTemplateRows: \'repeat(3, 1fr)\',\n          width: \'calc(3 * 2.5rem)\',\n          height: \'calc(3 * 2.5rem)\',\n          border: \'1px solid #999\',\n        }}\n      >\n        {squares.map((square, squareIndex) => (\n          <Square\n            key={squareIndex}\n            value={square}',
    'value={square}\n            onSquareClick={() => handleClick(squareIndex)}\n          />\n        ))}\n      </div>\n    </>\n  )\n}\n```'
  ];

  const embeddings = await embeding_model.embedDocuments(texts);
  
  embeddings.forEach((emb, i) => {
    console.log(`Embedding ${i} length: ${emb.length}`);
  });
}

main().catch(console.error);

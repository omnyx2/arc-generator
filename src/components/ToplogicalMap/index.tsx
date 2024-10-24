import { useDAG, nodeData, DAGAttribute } from "@/app/DAGContext"
import {topologicalGenerations, topologicalSort} from 'graphology-dag/topological-sort';
import DraggableCards from "@/components/DraggableCard"
import HoverCard from "../AddableCard";
import { DirectedGraph } from "typescript-graph";

interface pos {
  row: number;
  col: number;
}
type posType = pos | undefined;

function findIndexIn2DArray(arr: string[][], value: string): pos | undefined {
  for (let row = 0; row < arr.length; row++) {
      for (let col = 0; col < arr[row].length; col++) {
          if (arr[row][col] === value) {
              return { row: row, col: col };
          }
      }
  }
}
type widthInfo = { case: number, count: number, keyNodeId: string[] }
function getHeightFrom2DArray(data: string[][] , nodeId: string, graphMap: DAGAttribute): number{
  const h_ij: string[] = graphMap.outNeighbors(nodeId)
  const originPos: posType = findIndexIn2DArray(data,nodeId) 
  const targetPos: posType = findIndexIn2DArray(data,h_ij[0])
  if(targetPos === undefined || originPos === undefined) return 1; 
  return originPos?.row - targetPos?.row
}

function getWidthHint(nodeId: string, graphMap: DAGAttribute): widthInfo {
  // there is only two cased, Each node have to choose, 
  // case  0: It might have single parent node and many children node
  // It might have many parent node and single children node
  const parentNode = graphMap.inNeighbors(nodeId);
  const childrenNode = graphMap.outNeighbors(nodeId);
  if((parentNode.length === 1 || childrenNode.length === 1 || childrenNode.length === 0 )) {
    if(parentNode.length === 1) return {case: 0 , count: graphMap.outNeighbors(parentNode[0]).length, keyNodeId: parentNode } // 이경우는 부모로 부터 나누어줘야하고
    if(childrenNode.length === 1 || childrenNode.length === 0) return  {case: 1 ,  count: parentNode.length, keyNodeId: parentNode } // 이경우는 자식들로부터 더해줘야한다.
  } else {
    return {case: -1 , count: -1, keyNodeId: []}
  }
  return {case: -2 , count: -1, keyNodeId: []}
}

type heightDict = {
  [nodeKey: string]: number;
}
type widthDict = {
  [nodeKey: string]: number;
}
type GridProps = {
  graphMap: DAGAttribute;
    bc: ( where: string, nodeId:string, node: nodeData) => DAGAttribute;
  };
  // DAG를 그래프화 한다는게 쉽지는 않군,,,
  const Grid: React.FC<GridProps> = ({ graphMap, bc }) => {
    const relationShop: any = []
    const _data: any = topologicalGenerations(graphMap)
    const data: string[][] = _data.toReversed().map((e: string | string[])=> { return typeof e === "string" ? [e] : e})
    const hkeys: heightDict = {};
    const maxHeightBox = _data.length;
    const maxWidthBox =0;
    const wkeys: widthDict = {};
    data.forEach((e: string[])=> {
      e.forEach((nId)=> {
        hkeys[nId] = getHeightFrom2DArray(data, nId, graphMap)
      })
    })
    const BASEFULL_WIDTH = 20;
    _data.forEach( (e: string[], idx: number) => {
      e.forEach(nid => {
        if(idx === 0 ) {
          wkeys[nid] = BASEFULL_WIDTH
        } 
        else {
          const result: widthInfo = getWidthHint( nid, graphMap );
          console.dir(result)
          if (result.case === 0) wkeys[nid] = wkeys[result.keyNodeId[0]]/result.count;
          if (result.case === 1) wkeys[nid] = result.keyNodeId.reduce((accumulator, currentValue) => {
            return accumulator + wkeys[currentValue]
          }, 0);
        }   
      })
    })
    return (
      <div style={{ width: '40vw', display: 'grid', gap: '10px', gridAutoFlow: 'dense', 
 
      }}>
        {data.map((row, rowIndex) => {
          // console.log(row) 
          return (
          <div key={rowIndex} style={{ display: 'flex', alignItems: 'end', }}>
            {row.map((item, colIndex) => (
              <HoverCard
                idx ={colIndex}
                nodeId={item}
                height={`${8*hkeys[item]}`}
                width={`calc(${wkeys[item]}rem + ${0*10}px )`}
                handleLeftClick={() => bc("side", item, { nodeId: "4", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})}
                handleRightClick={() => bc("side", item, { nodeId: "4", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})}
                handleTopClick={() => bc("top", item, { nodeId: "4", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})}
                handleBottomClick={() => bc("bottom", item, { nodeId: "4", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})}
              >
                {item}
              </HoverCard>
            ))}
          </div>
        )})}
      </div>
    );
  };

function TopologicalMap () {
  const { hierarchyMap, setHierarchyMap } = useDAG();
  console.log(topologicalGenerations(hierarchyMap));
  return (
  <div>
    <DraggableCards></DraggableCards>
    <Grid graphMap={hierarchyMap} bc={setHierarchyMap} />
  </div>)
}

export default TopologicalMap
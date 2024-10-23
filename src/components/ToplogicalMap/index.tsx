import { useDAG, nodeData, DAGAttribute } from "@/app/DAGContext"
import {topologicalGenerations, topologicalSort} from 'graphology-dag/topological-sort';
import DraggableCards from "@/components/DraggableCard"
import HoverCard from "../AddableCard";
import { DirectedGraph } from "typescript-graph";

type GridProps = {
  graphMap: DAGAttribute;
    bc: ( where: string, nodeId:string, node: nodeData) => DAGAttribute;
  };
  // DAG를 그래프화 한다는게 쉽지는 않군,,,
  const Grid: React.FC<GridProps> = ({ graphMap, bc }) => {
    const data: any = topologicalGenerations(graphMap).toReversed()
    graphMap.forEachNode((node, attributes)=> {
      console.log(node, graphMap.inNeighbors(node), graphMap.outNeighbors(node), attributes)
    })
    return (
      <div style={{ width: '40vw', display: 'grid', gap: '10px' }}>
        {data.map((row, rowIndex) => {
          // console.log(row) 
          if( typeof row === "string" ) row = [row]
          return (
          <div key={rowIndex} style={{ display: 'flex', gap: '10px' }}>
            {row.map((item, colIndex) => (
              <HoverCard
                idx ={colIndex}
                nodeId={item}
                width={`calc(100%/${row.length})`}
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
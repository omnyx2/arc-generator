'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { singleARCObjectOption } from '@/components/baseObject';
import { DirectedAcyclicGraph } from 'typescript-graph'
import { DirectedGraph } from 'graphology'
import UniqueCodeGenerator from '@/settings/uniquenumber'


// Define the shape of the context value

export interface arcNode {
  data: any;
  operations: any[];
  type: string;  
}
export interface twoleveled {
  arcs: arcNode[];
  operations: any[];
}
export type nodeData =  { nodeId: string, mergeEdge: number[], operations: any[], metadata: twoleveled}
export type edgeData =  any
export type graphData =  any
export type DAGNode = {[nodeId: string]: nodeData}
export type DAGAttribute =  DirectedGraph<nodeData, edgeData, graphData>;

export interface DAGContextType {
  hierarchyMap: DAGAttribute
  setHierarchyMap: (where:string, nodeId:string, node: nodeData) => DAGAttribute;
}

// Create the context with a default value
export const DAGContext = createContext<DAGContextType | undefined>(undefined);

// Define props for the OptionsProvider component
interface DAGProviderProps {
  children: ReactNode;
}
  
// init the gragh
const initGraph = new DirectedGraph<nodeData>();
 
initGraph.addNode("0",   { nodeId: "0", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("1",  { nodeId: "1", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("2",  { nodeId: "2", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("3", { nodeId: "3", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("4", { nodeId: "4", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("5", { nodeId: "5", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("6", { nodeId: "6", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("7", { nodeId: "7", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("8", { nodeId: "8", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("9", { nodeId: "9", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
initGraph.addNode("10", { nodeId: "10", mergeEdge: [], operations: [] , metadata: {arcs:  [], operations: []}})
 
initGraph.mergeEdge("0", "1");
initGraph.mergeEdge("0", "2");
initGraph.mergeEdge("0", "3");
initGraph.mergeEdge("0", "4");
initGraph.mergeEdge("4", "10");

initGraph.mergeEdge("2", "5");
initGraph.mergeEdge("3", "5");
initGraph.mergeEdge("5", "9");
initGraph.mergeEdge("1", "6");
initGraph.mergeEdge("6", "7");
initGraph.mergeEdge("6", "8");
initGraph.mergeEdge("7", "9");
initGraph.mergeEdge("8", "9");
initGraph.mergeEdge("9", "10");
 

export const DAGProvider: React.FC<DAGProviderProps> = ({ children }) => {

  const [hierarchyMap, setHierarchyMap] = useState<DirectedGraph<nodeData, edgeData, graphData>>(initGraph);
  const codeGenerator = UniqueCodeGenerator.getInstance();

  function _set(where: string, nodeId: string, node: nodeData): DirectedGraph<nodeData, edgeData, graphData> {
    let newGraph: DirectedGraph<nodeData, edgeData, graphData> | undefined = undefined 
    switch (where){
      case 'bottom':
        newGraph = _setBottom(nodeId, node);
        break;
      case 'top':
        newGraph = _setTop(nodeId, node);
        break;
      case 'side':
        newGraph = _setSide(nodeId, node);
        break;
      default:
        throw Error("Can't Put Node why??");
    }
    setHierarchyMap(newGraph)
    return newGraph
  }

  // there add graph only for bottom of cur node not for layer
  function _setBottom(nodeId: string, node: nodeData): DirectedGraph<nodeData, edgeData, graphData> {
    // generate unique id
    const uniqueCode = codeGenerator.getUniqueCode();
    // this is for side case
    // Find parent nodes (nodes with edges toward the current node)
    const parents = hierarchyMap.inNeighbors(nodeId);
    hierarchyMap.addNode(uniqueCode, node);
    hierarchyMap.mergeEdge(uniqueCode, nodeId)
    parents.forEach((e) => hierarchyMap.mergeEdge(e, uniqueCode) )
    const newGraph: DirectedGraph<nodeData, edgeData, graphData> = hierarchyMap.copy();
    return newGraph
  }
  
  // there add graph only for top of cur node not for layer
  function _setTop(nodeId: string, node: nodeData): DirectedGraph<nodeData, edgeData, graphData> {
    // generate unique id
    const uniqueCode = codeGenerator.getUniqueCode();
    // this is for side case
    // Find parent nodes (nodes with edges toward the current node)
    const children = hierarchyMap.outNeighbors(nodeId);
    const parents = hierarchyMap.inNeighbors(nodeId);
    hierarchyMap.addNode(uniqueCode, node);
    
    hierarchyMap.mergeEdge(nodeId, uniqueCode);
    children.forEach((e) => hierarchyMap.mergeEdge(uniqueCode, e) );
    children.forEach((e) => hierarchyMap.dropEdge(nodeId, e) );

    const newGraph: DirectedGraph<nodeData, edgeData, graphData> = hierarchyMap.copy();
    
    return newGraph
  }

  function _setSide(nodeId: string, node: nodeData): DirectedGraph<nodeData, edgeData, graphData> {
    // generate unique id
    const uniqueCode = codeGenerator.getUniqueCode();
    // this is for side case
    // Find parent nodes (nodes with edges toward the current node)
    const parents = hierarchyMap.inNeighbors(nodeId);
    const children = hierarchyMap.outNeighbors(nodeId);
    hierarchyMap.addNode(uniqueCode, node);
    parents.forEach((e) => hierarchyMap.mergeEdge(e, uniqueCode) )
    children.forEach((e) => hierarchyMap.mergeEdge(uniqueCode, e) )
    const newGraph: DirectedGraph<nodeData, edgeData, graphData> = hierarchyMap.copy();
    return newGraph
  }

  const value: DAGContextType  = { hierarchyMap, setHierarchyMap: _set};

  return (
    <DAGContext.Provider value={value}>
      {children}
    </DAGContext.Provider>
  );
};

// Utility hook for using this context
export const useDAG = (): DAGContextType => {
  const context = React.useContext(DAGContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};



// #Guillaume Plique. (2021). Graphology, a robust and multipurpose Graph object for JavaScript. Zenodo. https://doi.org/10.5281/zenodo.5681257
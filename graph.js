class Graph {
    constructor(directed = false) {
        this.adjacencyList = {};
        this.directed = directed;
    }

    // Add a vertex
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Add an edge
    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);

        this.adjacencyList[vertex1].push(vertex2);

        if (!this.directed) {
            this.adjacencyList[vertex2].push(vertex1);
        }
    }

    // Remove an edge
    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1] =
                this.adjacencyList[vertex1].filter(
                    vertex => vertex !== vertex2
                );
        }

        if (!this.directed && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex2] =
                this.adjacencyList[vertex2].filter(
                    vertex => vertex !== vertex1
                );
        }
    }

    // Confirm that an edge exists
    hasEdge(vertex1, vertex2) {
        return (
            this.adjacencyList[vertex1] &&
            this.adjacencyList[vertex1].includes(vertex2)
        );
    }

    // Print graph
    printGraph() {
        for (let vertex in this.adjacencyList) {
            console.log(
                vertex + " -> " + this.adjacencyList[vertex].join(", ")
            );
        }
    }

    // Depth-First Search
    depthFirstSearch(start) {
        const visited = new Set();
        const result = [];

        const dfs = (vertex) => {
            if (visited.has(vertex)) {
                return;
            }

            visited.add(vertex);
            result.push(vertex);

            for (let neighbor of this.adjacencyList[vertex] || []) {
                dfs(neighbor);
            }
        };

        dfs(start);

        console.log("DFS:", result.join(" -> "));
        return result;
    }

    // Breadth-First Search
    breadthFirstSearch(start) {
        const visited = new Set();
        const queue = [start];
        const result = [];

        visited.add(start);

        while (queue.length > 0) {
            const vertex = queue.shift();

            result.push(vertex);

            for (let neighbor of this.adjacencyList[vertex] || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        console.log("BFS:", result.join(" -> "));
        return result;
    }
}


//TESTING
const graph = new Graph(false);

// Add edges
graph.addEdge("A","B");
graph.addEdge("A","C");
graph.addEdge("B","C");

console.log("Graph:");
graph.printGraph();

console.log("\nDoes A have an edge to B");
console.log(graph.hasEdge("A","B"));

console.log("\nRemoving edge A-C...");
graph.removeEdge("A", "C");

console.log("\nGraph after removing A-C:");
graph.printGraph();

//Add A - C for traversal
graph.addEdge("A","C");

console.log("\nDFS starting from A:");
graph.depthFirstSearch("A");

console.log("\nBFS starting from A:");
graph.breadthFirstSearch("A");

// Directed graph testing
const directedGraph = new Graph(true);

directedGraph.addEdge("A", "B");
directedGraph.addEdge("A", "C");
directedGraph.addEdge("B", "C");

console.log("\nDirected Graph:");
directedGraph.printGraph();

console.log("\nDFS on directed graph starting from A:");
directedGraph.depthFirstSearch("A");

console.log("\nBFS on directed graph starting from A:");
directedGraph.breadthFirstSearch("A");
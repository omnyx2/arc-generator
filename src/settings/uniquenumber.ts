class UniqueCodeGenerator {
    private static instance: UniqueCodeGenerator;
    private codeStore: Set<string>;
  
    // Private constructor prevents external instantiation
    private constructor() {
      this.codeStore = new Set();
    }
  
    // Public method to get the single instance
    public static getInstance(): UniqueCodeGenerator {
      if (!UniqueCodeGenerator.instance) {
        UniqueCodeGenerator.instance = new UniqueCodeGenerator();
      }
      return UniqueCodeGenerator.instance;
    }
  
    public getUniqueCode(): string {
      let uniqueCode = Math.floor(1000 + Math.random() * 9000);
      while(this.codeStore.has(uniqueCode.toString())) {
        uniqueCode = Math.floor(1000 + Math.random() * 9000);
      }
      this.codeStore.add(uniqueCode.toString());
      return uniqueCode.toString();
      // Retrieve and return the unique code
    }
}

export default UniqueCodeGenerator
  
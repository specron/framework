/**
 * Solc compiler configuration input.
 * @see http://solidity.readthedocs.io/en/v0.5.11/using-the-compiler.html
 */
export interface SolcInput {
  // Source code language.
  language?: 'Solidity' | 'Yul';
  // Source.
  sources?: {
    [file: string]: {
      // Hash of the source file.
      keccak256?: string;
      // Source file URL.
      urls?: string[];
      // Source code.
      content?: string;
    };
  };
  // Compiler options.
  settings?: {
    // Sorted list of remappings
    remappings?: string[];
    // Optimizer settings (enabled defaults to false)
    optimizer?: {
      // Disabled by default
      enabled?: boolean;
      // Lower values will optimize more.
      runs?: number;
      // Switch optimizer components on or off in detail.
      details?: {
        // The peephole optimizer is always on if no details are given.
        peephole?: boolean;
        // The unused jumpdest remover is always on if no details.
        jumpdestRemover?: boolean;
        // Sometimes re-orders literals in commutative operations.
        orderLiterals?: boolean;
        // Removes duplicate code blocks.
        deduplicate?: boolean;
        // Common subexpression elimination.
        cse?: boolean;
        // Optimize representation of literal numbers and strings in code.
        constantOptimizer?: boolean;
        // The new Yul optimizer.
        yul?: boolean,
        // Tuning options for the Yul optimizer.
        yulDetails?: {
          // Improve allocation of stack slots for variables.
          stackAllocation?: boolean;
        };
      };
    };
    // Version of the EVM to compile for. Affects type checking and code generation.
    evmVersion?: 'homestead' | 'tangerineWhistle' | 'spuriousDragon' | 'byzantium' | 'constantinople' | 'petersburg';
    // Metadata settings (optional)
    metadata?: {
      // Use only literal content and not URLs (false by default)
      useLiteralContent?: boolean;
    };
    // Addresses of the libraries. If not all libraries are given here, it can result in unlinked objects whose output data is different.
    libraries?: {
      [file: string]: {
        [contract: string]: string;
      };
    };
    // The available output types.
    outputSelection?: {
      [file: string]: {
        [contract: string]: (
          'ast' | 'legacyAST' | 'abi' | 'devdoc' | 'userdoc' | 'metadata' 
          | 'ir' | 'irOptimized' | 'evm.assembly' | 'evm.legacyAssembly'
          | 'evm.bytecode.object' | 'evm.bytecode.opcodes'
          | 'evm.bytecode.sourceMap' | 'evm.bytecode.linkReferences'
          | 'evm.deployedBytecode*' | 'evm.methodIdentifiers'
          | 'evm.gasEstimates'
          // | 'ewasm.wast' | 'ewasm.wasm' (not  implemented)
        )[];
      };
    };
  };
};

/**
 * Solc compiler output object.
 * @see http://solidity.readthedocs.io/en/v0.4.31/using-the-compiler.html
 */
export interface SolcOutput {
  // Optional: not present if no errors/warnings were encountered
  errors?: {
    // Optional: Location within the source file.
    sourceLocation?: {
      file: string;
      start: number;
      end: number;
    };
    // Optional: Further locations (e.g. places of conflicting declarations)
    secondarySourceLocations?: {
      file: string;
      start: number;
      end: number;
      message: string;
    }[],
    // Error type.
    type: 'TypeError' | 'InternalCompilerError' | 'Exception';
    // Component where the error originated.
    component: 'general' | 'ewasm';
    // Severity level.
    severity: 'error' | 'warning';
    // Error message.
    message: string;
    // Message formatted with source location.
    formattedMessage?: string;
  }[];
  // This contains the file-level outputs. In can be limited/filtered by the outputSelection settings.
  sources?: {
    [file: string]: {
      // Identifier (used in source maps).
      id: number;
      // The AST object.
      ast: any;
      // The legacy AST object.
      legacyAST: any;
    };
  };
  // This contains the contract-level outputs. It can be limited/filtered by the outputSelection settings.
  contracts?: {
    [file: string]: {
      // If the language used has no contract names, this field should equal to an empty string.
      [contract: string]: {
        // The Ethereum Contract ABI. If empty, it is represented as an empty array.
        // See https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
        abi: any[],
        // See the Metadata Output documentation (serialised JSON string).
        metadata: string;
        // User documentation (natspec).
        userdoc: any;
        // Developer documentation (natspec).
        devdoc: any;
        // Intermediate representation (string).
        ir: string;
        // EVM-related outputs.
        evm: {
          // Assembly (string).
          assembly: string;
          // Old-style assembly (object).
          legacyAssembly?: any;
          // Bytecode and related details.
          bytecode?: {
            // The bytecode as a hex string.
            object: string;
            // Opcodes list (string)
            opcodes: string;
            // The source mapping as a string. See the source mapping definition.
            sourceMap: string;
            // If given, this is an unlinked object.
            linkReferences: {
              [file: string]: {
                [lib: string]: {
                  start: number;
                  length: number;
                }[];
              };
            };
          };
          // The same layout as above.
          deployedBytecode?: {
            // The bytecode as a hex string.
            object: string;
            // Opcodes list (string)
            opcodes: string;
            // The source mapping as a string. See the source mapping definition.
            sourceMap: string;
            // If given, this is an unlinked object.
            linkReferences: {
              [file: string]: {
                [lib: string]: {
                  start: number;
                  length: number;
                }[];
              };
            };
          };
          // The list of function hashes
          methodIdentifiers?: {
            [fn: string]: string;
          };
          // Function gas estimates.
          gasEstimates?: {
            creation?: {
              codeDepositCost: string;
              executionCost: string;
              totalCost: string;
            };
            external?: {
              [fn: string]: string;
            };
            internal?: {
              [fn: string]: string;
            };
          };
        };
        // eWASM related outputs.
        ewasm?: {
          // S-expressions format.
          wast?: string;
          // Binary format (hex string).
          wasm?: string;
        };
      };
    };
  };
}

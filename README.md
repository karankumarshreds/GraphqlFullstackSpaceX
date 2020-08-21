<h2>Resolver</h2>

<h5>A resolver function returns one of the following:</h5>

- <p>Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.)</p>
- <p>A promise that fulfills with data of the required type</p>

<h3>The resolver function parameters</h3>
<p>The resolver functions can optionally accept four positional arguments</p>
<table>
    <tr>
        <th><h5>ARGUMENT</h5></th>
        <th><h5>DESCRIPTION</h5></th>
    </tr>
        <tr>
            <td>parent</td>
            <td>This is the return value of the resolver for this field's parent (the resolver for a parent field always executes before the resolvers for that field's children).</td>
        </tr>
        <tr>
            <td>args</td>
            <td>This object contains all GraphQL arguments provided for this field.</td>
        </tr>
        <tr>
            <td>context</td>
            <td>This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources.</td>
        </tr>
        <tr>
            <td>info</td>
            <td>This contains information about the execution state of the operation (used only in advanced cases.</td>
        </tr>
    </th>
</table>

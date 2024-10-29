import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;

public class JsonBigNumberParser {

    // Method to parse a JSON string to a JSONObject with BigDecimal for large numbers
    public static JSONObject parseJsonString(String jsonString) {
        JSONObject jsonObject = new JSONObject(jsonString);
        
        jsonObject.keySet().forEach(key -> {
            Object value = jsonObject.get(key);
            if (value instanceof String && isNumeric((String) value)) {
                jsonObject.put(key, new BigDecimal((String) value));
            }
        });
        
        return jsonObject;
    }

    // Method to parse a JSON array string with BigDecimal for numeric values
    public static JSONArray parseJsonStringToList(String jsonString) {
        JSONArray jsonArray = new JSONArray(jsonString);
        
        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof String && isNumeric((String) value)) {
                jsonArray.put(i, new BigDecimal((String) value));
            }
        }
        
        return jsonArray;
    }

    // Helper method to check if a string is numeric
    public static boolean isNumeric(String str) {
        try {
            new BigDecimal(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        // Example JSON object
        String jsonString1 = "{\"name\": \"Alice\", \"age\": \"25\", \"bigNumber\": \"1234567890123456789012345678901234567890.12345678901234567890\"}";
        JSONObject parsedObject = parseJsonString(jsonString1);
        
        System.out.println("Parsed Object: " + parsedObject);
        System.out.println("Arbitrary precision Number (bigNumber): " + ((BigDecimal) parsedObject.get("bigNumber")).toPlainString());

        System.out.println("-----------------------JSON String To List-------------------------");
        
        // Example JSON array
        String jsonStringArray = "[\"1234567890123456789012345678901234567890\", \"apple\", \"banana\", \"3.1415926535897932384626433832795028841971\"]";
        JSONArray parsedList = parseJsonStringToList(jsonStringArray);
        
        System.out.println("Parsed List: " + parsedList);
        System.out.println("First item as BigDecimal: " + ((BigDecimal) parsedList.get(0)).toPlainString());
        System.out.println("Last item as BigDecimal: " + ((BigDecimal) parsedList.get(3)).toPlainString());
    }
}

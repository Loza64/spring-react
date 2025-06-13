package com.project.app.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayListDto {

    @NotBlank(message = "El nombre de la playlist no puede estar vacío")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    @Pattern(regexp = "^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ'-]+$", message = "El nombre contiene caracteres no permitidos")
    private String name;

    @Size(max = 200, message = "La descripción no puede exceder los 200 caracteres")
    private String description;

    @NotNull(message = "La duración no puede ser nula")
    @DecimalMin(value = "0.1", message = "La duración debe ser mayor a 0")
    @DecimalMax(value = "999.9", message = "La duración no puede exceder 999.9 minutos")
    private Double duration;

    @NotNull(message = "La lista de canciones no puede ser nula")
    @Size(min = 1, message = "La playlist debe contener al menos 1 canción")
    private List<@Positive(message = "El ID de la canción debe ser positivo") Long> songIds;
}